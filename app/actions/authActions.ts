'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

import {
  loginSchema,
  signupSchema,
  forgotSchema,
  resetSchema,
  updateSchema
} from '@/utils/validations/validations'
import { headers } from 'next/headers'

type FormState = {
  success: boolean
  error: { type: string; message: string }[]
  inputs: Record<string, string>
}

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const validation = loginSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.errors.map((error) => ({
      type: error.path[0] as string,
      message: error.message
    }))
    console.log(errors)
    return {
      success: false,
      error: errors,
      inputs: data
    }
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return {
      success: false,
      error: [
        {
          type: 'email',
          message: 'El correo electrónico o la contraseña son incorrectos'
        },
        {
          type: 'password',
          message: 'El correo electrónico o la contraseña son incorrectos'
        }
      ],
      inputs: data
    }
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

export async function forgotPassword(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const headerList = await headers()

  const supabase = await createClient()
  const origin = headerList.get('origin')

  const data = {
    email: formData.get('email') as string
  }

  const validation = forgotSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.errors.map((error) => ({
      type: error.path[0] as string,
      message: error.message
    }))
    console.log(errors)
    return {
      success: false,
      error: errors,
      inputs: data
    }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`
  })

  if (error) {
    return {
      success: false,
      error: [
        {
          type: 'email',
          message:
            'No se pudo enviar el correo de restablecimiento de contraseña'
        }
      ],
      inputs: data
    }
  }
  return {
    success: true,
    error: [],
    inputs: data
  }
}

export async function resetPassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient()

  const data = {
    password: formData.get('password') as string,
    passwordConfirm: formData.get('passwordConfirm') as string
  }

  const validation = resetSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.errors.map((error) => ({
      type: error.path[0] as string,
      message: error.message
    }))
    console.log(errors)
    return {
      success: false,
      error: errors,
      inputs: data
    }
  }

  if (data.password !== data.passwordConfirm) {
    return {
      success: false,
      error: [{ type: 'password', message: 'Las contraseñas no coinciden' }],
      inputs: data
    }
  }

  const { error } = await supabase.auth.updateUser({
    password: data.password
  })

  if (error) {
    return {
      success: false,
      error: [
        { type: 'password', message: 'No se pudo actualizar la contraseña' }
      ],
      inputs: data
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export const signOutAction = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}

export async function updateUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient()

  const data = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string
    // password: formData.get('password') as string
  }

  const validation = updateSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.errors.map((error) => ({
      type: error.path[0] as string,
      message: error.message
    }))
    console.log(errors)
    return {
      success: false,
      error: errors,
      inputs: data
    }
  }

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: data.fullName
    },
    email: data.email
    // password: data.password
  })

  if (error) {
    return {
      success: false,
      error: [{ type: 'email', message: 'No se pudo actualizar el usuario.' }],
      inputs: data
    }
  }
  return {
    success: true,
    error: [],
    inputs: data
  }
}
