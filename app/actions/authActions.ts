'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

import { signupSchema } from '@/utils/validations/auth-validations'

type FormState = {
  success: boolean
  error: { type: string; message: string }[]
  inputs: Record<string, string>
}

export async function login(
  state: { error: string },
  formData: FormData
): Promise<{ error: string; inputs: { email: string; password: string } }> {
  const supabase = await createClient()

  // console.log('prevState', prevState)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  if (!data.email || !data.password) {
    return {
      error: 'El correo electrónico o contraseña son requeridos',
      inputs: data
    }
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: 'Correo electrónico o contraseña incorrecta', inputs: data }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    fullname: formData.get('fullname') as string,
    password: formData.get('password') as string,
    passwordConfirm: formData.get('passwordConfirm') as string
  }

  const validation = signupSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.errors.map((error) => ({
      type: error.path[0] as string,
      message: error.message
    }))
    console.log('errors', errors)
    return {
      success: false,
      error: errors,
      inputs: data
    }
  }
  if (data.password !== data.passwordConfirm) {
    return {
      success: false,
      error: [
        {
          type: 'password',
          message: 'Las contraseñas no coinciden'
        }
      ],
      inputs: data
    }
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.fullname
      }
    }
  })

  if (error?.code === 'user_already_exists') {
    return {
      success: false,
      error: [
        {
          type: 'email',
          message: 'El correo electrónico ya está registrado'
        }
      ],
      inputs: data
    }
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

export const signOutAction = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}
