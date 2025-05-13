'use client'
// import BuyTickets from '@/components/buy/buy-tickets'

import { useSearchParams } from 'next/navigation'

// supabase
import { useSupabase } from '@/lib/supabase-provider'
import { Suspense, useEffect, useState } from 'react'
import PageLoader from '@/components/page-loader'
import { PostgrestError } from '@supabase/supabase-js'
const Page = () => {
  const [data, setData] = useState<EventsType | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { supabase } = useSupabase()

  useEffect(() => {
    const getEvent = async () => {
      if (!supabase) {
        return
      }
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()
      if (error) {
        console.log('Error fetching event:', error)
        setError(error)
      } else {
        console.log('Event data:', data)
        setData(data)
      }
    }
    getEvent()
  }, [id, supabase])
  if (!id || error) {
    return (
      <section className='container'>
        <h1>Evento no encontrado</h1>
      </section>
    )
  }
  return (
    <Suspense fallback={<PageLoader loading={true} />}>
      <section className='container'>
        {data?.id}
        {/* <BuyTickets id={id} /> */}
      </section>
    </Suspense>
  )
}

export default Page
