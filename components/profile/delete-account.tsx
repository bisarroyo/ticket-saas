'use client'
import { useActionState } from 'react'
import { deleteAccount } from '@/app/actions/authActions'
import Button from '@/components/ui/button'

const DeleteAccount = () => {
  const [, formAction, isPending] = useActionState(deleteAccount, {
    success: false,
    error: [{ type: '', message: '' }],
    inputs: {}
  })
  return (
    <>
      <section className='container'>
        <div className='flex flex-col items-start justify-center min-h-fit py-5 w-full md:max-w-[330px]'>
          <h3 className='text-3xl'>Eliminar cuenta</h3>
          <p>¿Estas seguro de que deseas eliminar tu cuenta?</p>
          <p className='mb-4 font-bold'>Esta acción es irreversible</p>
          <form
            action={formAction}
            className='flex flex-col items-start justify-center w-full gap-4'
          >
            <Button
              text='Eliminar cuenta'
              textLoading='Eliminando...'
              isPending={isPending}
              variant='danger'
              type='submit'
            />
          </form>
        </div>
      </section>
    </>
  )
}

export default DeleteAccount
