'use client'
import { useActionState } from 'react'
import { resetPassword } from '@/app/actions/authActions'

// UI components
import InputPassword from '@/components/ui/password'
import Button from '@/components/ui/button'

const PasswordResetForm = () => {
  const [state, formAction, isPending] = useActionState(resetPassword, {
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
        <h3 className='text-3xl'>Actualizar contraseña</h3>
        <p className='mb-4'>Ingresa tu nueva contraseña</p>
        <form
          action={formAction}
          className='flex flex-col items-start justify-center w-full gap-4'
        >
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
          <Button
            text='Actualizar contraseña'
            textLoading='Actualizando...'
            isPending={isPending}
            type='submit'
          />
        </form>
        <div className='mt-4'>
          {' '}
          {state?.success && (
            <div>Contraseña actualizada exitosamente</div>
          )}{' '}
        </div>
      </div>
    </section>
  )
}

export default PasswordResetForm
