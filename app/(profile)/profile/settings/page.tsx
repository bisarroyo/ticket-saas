'use client'
import useUser from '@/hooks/useUser'
import Loading from '@/components/ui/loading'
import UserForm from '@/components/profile/user-form'

export default function Page() {
  const { data, loading } = useUser()

  return (
    <div className='max-w-xl mx-auto'>
      {loading ? (
        <Loading />
      ) : (
        <div className='space-y-5'>
          <div className='p-5 border rounded-lg'>
            <h2 className=''>Perfil</h2>
            <p>Actualiza tu información persional</p>
            <UserForm user={data} />
          </div>
          <div className='p-5 border rounded-lg'>
            <h2 className=''>Seguridad</h2>
            <p>Actualiza tus opciones de seguridad</p>
            <UserForm user={data} />
          </div>
        </div>
      )}
    </div>
  )
}
