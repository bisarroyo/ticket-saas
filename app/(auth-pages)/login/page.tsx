'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { login } from '@/app/actions/authActions'

import { ArrowUpRight, Mail } from 'lucide-react'

// Google auth components
import socialAuth from '@/utils/supabase/social-auth'
import AuthButtonGoogle from '@/components/auth/auth-button-google'
import Input from '@/components/ui/input'
import InputPassword from '@/components/ui/password'
import Button from '@/components/ui/button'

export default function Page() {
  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    error: [{ type: '', message: '' }],
    inputs: {
      email: '',
      fullname: '',
      password: '',
      passwordConfirm: ''
    }
  })

  return (
    <section className='container'>
      <div className='flex flex-col items-start justify-center min-h-fit py-32 w-full md:max-w-[330px]'>
        <h1 className='text-3xl'>Iniciar Sesión</h1>
        <p className='mb-4'>Hola, Bienvenido a Plus Eventos</p>
        <AuthButtonGoogle
          socialAuth={() => socialAuth('google')}
          text='Inciar sesión con Google'
        />
        <div className='my-4 flex justify-center items-center w-full'>
          <span className='border w-auto h-[1px] hidden sm:block'></span>
          <p className='w-fit text-muted text-center'>
            O Inicia sesión con tu correo
          </p>
          <span className='border w-auto hidden sm:block'></span>
        </div>
        <form
          action={formAction}
          className='flex flex-col items-start justify-center w-full gap-4'
        >
          <Input
            label='Email:'
            id='email'
            name='email'
            type='email'
            placeholder='nombre@email.com'
            defaultValue={state?.inputs?.email}
            required
            error={state.error}
            icon={
              <Mail
                strokeWidth={1.5}
                size='20'
                color='var(--muted-foreground)'
                className='absolute bottom-3 end-2'
              />
            }
          />
          <InputPassword
            label='Contraseña:'
            id='password'
            name='password'
            placeholder='Ingresa tu contraseña'
            defaultValue={state?.inputs?.password}
            required
            error={state.error}
          />
          <p className='w-full text-end'>
            <Link href='/forgot-password' className=' text-primary'>
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
          <Button
            text='Iniciar Sesión'
            textLoading='Iniciando sesión...'
            isPending={isPending}
            type='submit'
          />
        </form>
        <p className='text-center w-full mt-3 flex items-center justify-center gap-2'>
          ¿No tienes cuenta?{' '}
          <Link href='/signup' className='text-primary flex items-center'>
            Registrate
            <ArrowUpRight strokeWidth={1.5} size='20' />
          </Link>
        </p>
      </div>
    </section>
  )
}
