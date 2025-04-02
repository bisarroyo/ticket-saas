'use client'
// import BuyTickets from '@/components/buy/buy-tickets'

import { useParams } from 'next/navigation'
const Page = () => {
  const params = useParams()
  const { id } = params

  return (
    <section className='container'>
      {id}
      {/* <BuyTickets id={id} /> */}
    </section>
  )
}

export default Page
