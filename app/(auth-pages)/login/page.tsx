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

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, {
    error: '',
    inputs: { email: '', password: '' }
  })

  return (
    <section className='container'>
      <div className='flex flex-col items-start justify-center min-h-fit py-32 w-full max-w-[330px]'>
        <h1 className='text-3xl'>Iniciar Sesión</h1>
        <p className='mb-4'>Hola, Bienvenido a Plus Eventos</p>
        <AuthButtonGoogle socialAuth={() => socialAuth('google')} />
        <div className='my-4 flex items-center justify-between w-full'>
          <span className='border w-12'></span>
          <p className='w-fit text-muted'>O inicia sesión con tu correo</p>
          <span className='border w-12'></span>
        </div>
        <form
          action={formAction}
          className='flex flex-col items-start justify-center w-full'
        >
          <Input
            label='Email:'
            id='email'
            name='email'
            type='email'
            placeholder='nombre@email.com'
            defaultValue={state?.inputs?.email}
            required
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
          />
          {state.error && (
            <p className='text-red-500 text-sm text-center w-full'>
              {state.error}
            </p>
          )}
          <p className='w-full text-end'>
            <Link href='/forgot-passwpord' className=' text-primary'>
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
