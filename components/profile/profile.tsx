'use client'
import type { User } from '@supabase/supabase-js'
import Image from 'next/image'

const UserProfile: React.FC<{
  user: User | undefined
}> = ({ user }) => {
  console.log(user)
  return (
    <div className='container max-w-xl mx-auto flex gap-4 my-8'>
      <div className='w-[100px]'>
        <Image
          src={user?.user_metadata.avatar_url}
          className='w-20 h-20 rounded-full'
          alt='User photo'
          width={100}
          height={100}
        />
      </div>
      <div className='text-lg'>
        <p>{user?.user_metadata.full_name}</p>
        <p>{user?.email}</p>
      </div>
    </div>
  )
}

export { UserProfile }
