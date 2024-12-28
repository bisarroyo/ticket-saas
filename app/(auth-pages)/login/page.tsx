'use client'

import Link from 'next/link'
import { useActionState, useState } from 'react'
import { login } from '@/app/actions/authActions'

import { ArrowUpRight, Eye, EyeOff, Mail } from 'lucide-react'

// Google auth components
import socialAuth from '@/utils/supabase/social-auth'
import AuthButtonGoogle from '@/components/auth/auth-button-google'

export default function LoginPage() {
  const [error, formAction, isPending] = useActionState(login, {
    error: ''
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const showPasswordField = () => {
    setShowPassword(!showPassword)
  }

  console.log('state', error)
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
          <div className='flex flex-col w-full mb-4 relative'>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='nombre@email.com'
              required
              className='bg-transparent pl-4 pr-8 py-2 w-full border rounded-md focus:ring-1 focus-visible:outline-none focus:outline-none focus:ring-primary-foreground/50 '
            />
            <Mail
              strokeWidth={1.5}
              size='20'
              color='var(--muted-foreground)'
              className='absolute bottom-3 end-2'
            />
          </div>
          <div className='flex flex-col w-full mb-4 relative'>
            <label htmlFor='password'>Password:</label>
            <input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Ingresa tu contraseña'
              required
              className='bg-transparent pl-4 pr-8 py-2  w-full border rounded-md focus:ring-1 focus-visible:outline-none focus:outline-none focus:ring-primary-foreground/50'
            />
            <div
              onClick={showPasswordField}
              className='absolute bottom-3 end-2 cursor-pointer'
            >
              {showPassword ? (
                <Eye
                  strokeWidth={1.5}
                  size='20'
                  color='var(--muted-foreground)'
                />
              ) : (
                <EyeOff
                  strokeWidth={1.5}
                  size='20'
                  color='var(--muted-foreground)'
                />
              )}
            </div>
          </div>
          <p className='w-full text-end'>
            <Link href='/forgot-passwpord' className=' text-primary'>
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
          <button
            className='w-full text-md py-2 px-4 text-center bg-primary rounded-md text-white mt-4 hover:bg-primary-foreground focus:ring-4 focus:outline-none focus:ring-primary-foreground/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            type='submit'
            disabled={isPending}
          >
            {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
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
