'use client'
import { useActionState } from 'react'
import { forgotPassword } from '@/app/actions/authActions'

import Input from '@/components/ui/input'
import Button from '@/components/ui/button'
import { Mail } from 'lucide-react'

const Page = () => {
  const [state, formAction, isPending] = useActionState(forgotPassword, {
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
      <div className='flex flex-col items-start justify-center min-h-fit py-5 w-full md:max-w-[330px]'>
        <h1 className='text-3xl'>Recuperar contraseña</h1>
        <p className='mb-4'>Hola, Bienvenido a Plus Eventos</p>
        <form
          action={formAction}
          className='flex flex-col items-start justify-center w-full'
        >
          <Input
            label='Correo electrónico:'
            id='email'
            name='email'
            type='email'
            placeholder='nombre@email.com'
            defaultValue={state?.inputs?.email}
            required
            error={state?.error}
            icon={
              <Mail
                strokeWidth={1.5}
                size='20'
                color='var(--muted-foreground)'
                className='absolute bottom-3 end-2'
              />
            }
          />
          <Button
            text='Enviar link'
            textLoading='Enviando...'
            isPending={isPending}
            type='submit'
          />
        </form>
        {state?.success && (
          <p className='text-success mt-4'>
            Se ha enviado un correo con un link para recuperar tu contraseña
          </p>
        )}
      </div>
    </section>
  )
}

export default Page
