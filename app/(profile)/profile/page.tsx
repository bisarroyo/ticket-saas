'use client'
import useUser from '@/hooks/useUser'
import Loading from '@/components/ui/loading'
import { UserProfile } from '@/components/profile/profile'

export default function Page() {
  const { data, error, loading } = useUser()

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='container max-w-xl mx-auto'>
      {loading ? (
        <Loading />
      ) : (
        <div className=''>
          <UserProfile user={data} />
        </div>
      )}
    </div>
  )
}
