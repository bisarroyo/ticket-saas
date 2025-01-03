'use client'
import { createClient } from '@/utils/supabase/client'
import { signOutAction } from '@/app/actions/authActions'
import Logo from '@/components/ui/logo'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { User as UserProps } from '@supabase/supabase-js'
import { Dropdown, DropdownItem } from '@/components/ui/dropdow'
import { LogOut, Tickets, User } from 'lucide-react'

export default function Header() {
  const supabase = createClient()

  const [user, setUser] = useState<UserProps>()

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      console.log(user)

      if (user) setUser(user)
    }

    fetchUser()
  }, [supabase.auth])
  return (
    <>
      <header className='md:sticky top-0 left-0 right-0 h-auto bg-white/70 backdrop-blur-xl backdrop-saturate-200  border-b-1 z-10'>
        <div className='container h-auto md:h-[100px] w-full py-4 gap-4 flex justify-evenly md:justify-between items-center flex-row flex-wrap md:flex-nowrap'>
          <div className=''>
            <Link
              color='foreground'
              href='/'
              className='flex justify-center items-center'
            >
              <Logo />
              <p className='text-xl pl-2 md:block hidden'>
                Plus
                <br />
                Eventos
              </p>
            </Link>
          </div>
          <div className=''>
            {user ? (
              <div>
                <Dropdown text={user?.user_metadata.name}>
                  <Link href='/profile'>
                    <DropdownItem icon={<User />}>
                      <p>Perfil</p>
                    </DropdownItem>
                  </Link>
                  <Link href='/profile'>
                    <DropdownItem icon={<Tickets />}>
                      <p>Tickets</p>
                    </DropdownItem>
                  </Link>
                  <DropdownItem
                    icon={<LogOut />}
                    className='text-red-500 hover:bg-red-100'
                  >
                    <form action={signOutAction} className='w-full h-full'>
                      <button type='submit' className='flex items-center gap-2'>
                        Cerrar sesión
                      </button>
                    </form>
                  </DropdownItem>
                </Dropdown>
              </div>
            ) : (
              <Link href='/login'>Iniciar Sesión</Link>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
