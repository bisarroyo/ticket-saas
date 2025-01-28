'use client'
import useUser from '@/hooks/useUser'
import Loading from '@/components/ui/loading'
import UserForm from '@/components/profile/user-form'
import AppModal from '@/components/modal'
import PasswordResetForm from '@/components/auth/reset-password'
import DeleteAccount from '@/components/profile/delete-account'

export default function Page() {
  const { data, loading, updateUser, updatingUser } = useUser()

  return (
    <div className='container max-w-xl mx-auto mt-4'>
      {loading ? (
        <Loading />
      ) : (
        <div className='space-y-5'>
          <div className=' space-y-2'>
            <h2>Información personal</h2>
            <p>Actualiza tu información personal</p>
            <UserForm
              user={data}
              loading={updatingUser}
              updateUser={updateUser}
            />
          </div>
          <hr />
          <div className=' space-y-2'>
            <h2>Seguridad</h2>
            <p>Actualiza tus opciones de seguridad</p>
            <AppModal buttonText='Cambiar contraseña'>
              <PasswordResetForm />
            </AppModal>
          </div>
          <hr />
          <div className=' space-y-2'>
            <h2>Eliminar Cuenta</h2>
            <p>
              Si no deseas usar nuestra plataforma, puedes eliminar tu cuenta
            </p>
            <AppModal buttonText='Eliminar cuenta' variant='danger'>
              <DeleteAccount />
            </AppModal>
          </div>
        </div>
      )}
    </div>
  )
}
