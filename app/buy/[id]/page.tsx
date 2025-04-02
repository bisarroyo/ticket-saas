'use client'
import BuyTickets from '@/components/buy/buy-tickets'

import { useParams } from 'next/navigation'
const Page = () => {
  const params = useParams()
  const id = params?.id as string | undefined

  return (
    <section className='container'>
      {id ? <BuyTickets id={id} /> : <p>Error: Invalid or missing ID</p>}
    </section>
  )
}

export default Page
