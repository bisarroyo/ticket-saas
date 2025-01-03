// import { redirect } from 'next/navigation'

// import { createClient } from '@/utils/supabase/server'
// import { signOutAction } from '@/app/actions/authActions'
// import Link from 'next/link'

// export default async function PrivatePage() {
//   const supabase = await createClient()

//   const { data, error } = await supabase.auth.getUser()
//   if (error || !data?.user) {
//     redirect('/login')
//   }

//   return (
//     <>
//       {' '}
//       <p>Hello {data.user.email}</p>
//       <form action={signOutAction}>
//         <button type='submit'>Sign out</button>
//         <br />
//         <Link href='/event/123'>Event</Link>
//       </form>
//     </>
//   )
// }

import Events from '@/components/events/events'
export default function Index() {
  return (
    <section className=' container my-5'>
      <h1>Próximos eventos</h1>
      <Events />
    </section>
  )
}
