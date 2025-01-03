'use client'
import Link from 'next/link'
import { useActionState } from 'react'
import { signup } from '@/app/actions/authActions'

// Icons
import { ArrowUpRight, Mail, Pencil } from 'lucide-react'

// Google auth components
import socialAuth from '@/utils/supabase/social-auth'
import AuthButtonGoogle from '@/components/auth/auth-button-google'

// UI components
import Input from '@/components/ui/input'
import InputPassword from '@/components/ui/password'
import Button from '@/components/ui/button'

export default function Page() {
  const [state, formAction, isPending] = useActionState(signup, {
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
      <div className='flex flex-col items-start justify-center min-h-fit py-5 w-full lg:max-w-[660px]'>
        <h1 className='text-3xl'>Registrarme</h1>
        <p className='mb-4'>Hola, Bienvenido a Plus Eventos</p>
        <AuthButtonGoogle
          socialAuth={() => socialAuth('google')}
          text='Registrarme con Google'
        />
        <div className='my-4 grid sm:grid-cols-3 w-full items-center'>
          <span className='border w-full h-[1px] hidden sm:block'></span>
          <p className='w-full text-muted text-center'>
            O registrate con tu correo
          </p>
          <span className='border w-full hidden sm:block'></span>
        </div>
        <form
          action={formAction}
          className='flex flex-col items-start justify-center w-full'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
            <Input
              label='Correo electrónico:'
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
            <Input
              label='Nombre:'
              id='fullname'
              name='fullname'
              type='text'
              placeholder='Ingresa tu nombre'
              defaultValue={state?.inputs?.fullname}
              required
              error={state.error}
              icon={
                <Pencil
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
            <InputPassword
              label='Confirmar contraseña:'
              id='passwordConfirm'
              name='passwordConfirm'
              placeholder='Confirma tu contraseña'
              defaultValue={state?.inputs?.passwordConfirm}
              required
              error={state.error}
            />
          </div>
          <Button
            text='Registrarme'
            textLoading='Registrando...'
            isPending={isPending}
            type='submit'
          />
        </form>
        <p className='text-center w-full mt-3 flex items-center justify-center gap-2'>
          ¿Ya tienes cuenta?{' '}
          <Link href='/login' className='text-primary flex items-center'>
            Iniciar Sesión
            <ArrowUpRight strokeWidth={1.5} size='20' />
          </Link>
        </p>
      </div>
    </section>
  )
}
