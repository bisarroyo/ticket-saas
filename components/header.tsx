'use client'
import { createClient } from '@/utils/supabase/client'
import Logo from '@/components/ui/logo'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Dropdown, DropdownItem } from '@/components/ui/dropdow'
import {
  CalendarPlus,
  Compass,
  LogOut,
  Settings,
  Tickets,
  User
} from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Header() {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState<string | null>()

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/login')
  }

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (user) setUser(user.user_metadata.name)
    }

    fetchUser()
  }, [supabase.auth])

  const activeLink = (path: string) => {
    return path === pathname
  }
  return (
    <>
      <header className='md:sticky top-0 left-0 right-0 h-auto  backdrop-blur-lg border-b-1 z-10'>
        <div className='container h-auto md:h-[70px] w-full py-4 gap-4 flex justify-evenly md:justify-between items-center flex-row flex-wrap md:flex-nowrap'>
          <div className=''>
            <Link href='/' className='flex justify-center items-center'>
              <Logo height='40' width='40' />
            </Link>
          </div>
          <div className='flex justify-center items-center gap-4'>
            <Link
              href='/'
              className={cn(
                'text-black hover:text-primary transition-all duration-300 flex justify-center items-center gap-2',
                activeLink('/') && 'text-primary opacity-100'
              )}
            >
              <Compass className='h-8 w-8 md:h-5 md:w-5' />
              <span className='hidden md:block'>Explorar</span>
            </Link>
            {user && (
              <>
                <Link
                  href='/tickets'
                  className={cn(
                    ' text-black hover:text-primary transition-all duration-300 flex justify-center items-center gap-2',
                    activeLink('/tickets') && 'text-primary'
                  )}
                >
                  <Tickets className='h-8 w-8 md:h-5 md:w-5' />
                  <span className='hidden md:block'>Mis Eventos</span>
                </Link>
              </>
            )}
          </div>
          <div className=''>
            {user ? (
              <div className='flex-'>
                <Dropdown text={user} icon={<User />}>
                  <Link href='/profile'>
                    <DropdownItem icon={<User size={20} />}>
                      <p>Mi perfil</p>
                    </DropdownItem>
                  </Link>
                  <Link href='/profile/settings'>
                    <DropdownItem icon={<Settings size={20} />}>
                      <p>Ajustes</p>
                    </DropdownItem>
                  </Link>
                  <Link href='/create'>
                    <DropdownItem icon={<CalendarPlus size={20} />}>
                      <p>Crear Evento</p>
                    </DropdownItem>
                  </Link>
                  <DropdownItem
                    icon={<LogOut size={20} />}
                    className='text-red-500 hover:bg-red-100'
                    onClick={logout}
                  >
                    <p>Cerrar sesión</p>
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
