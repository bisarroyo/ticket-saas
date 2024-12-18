import { createClient } from '@/utils/supabase/server'
import { signOutAction } from '@/app/actions/authActions'
import Logo from '@/components/ui/logo'
import Link from 'next/link'
// import UserDropdown from './ui/user-dropdown'

export default async function Header() {
  // const supabase = await createClient()
  // const { data: user } = await supabase.auth.getUser()
  return (
    <>
      <header className='md:sticky top-0 left-0 right-0 h-auto bg-white/70 backdrop-blur-xl backdrop-saturate-200 dark:bg-black/70 dark:backdrop-saturate-200 border-b-1 z-10'>
        <div className='container h-auto md:h-[100px] w-full py-4 gap-4 flex justify-evenly md:justify-between items-center flex-row flex-wrap md:flex-nowrap'>
          <div className='order-1 md:order-none '>
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
          {/* <div className='order-3 md:order-none w-full md:w-auto '>
            <Search />
          </div> */}
          <div className='order-2 md:order-none '>
            {/* {user.user ? (
              <UserDropdown
                email={user.user?.email}
                name={user.user?.user_metadata.full_name}
                signOutAction={signOutAction}
              />
            ) : (
              <Link href='/sign-in'>Iniciar Sesión</Link>
            )} */}
            <Link href='/login'>Iniciar Sesión</Link>
          </div>
        </div>
      </header>
    </>
  )
}
