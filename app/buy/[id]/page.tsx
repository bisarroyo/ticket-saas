'use client'
// import BuyTickets from '@/components/buy/buy-tickets'

// supabase
import { createClient } from '@/utils/supabase/client'
import { Suspense, use, useEffect, useState } from 'react'

import Loading from '@/components/ui/loading'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [data, setData] = useState<EventsType | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { id } = use(params)
  const supabase = createClient()

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
        setError('Error al cargar el evento')
      } else if (!data) {
        console.log('No event found')
        setError('Evento no encontrado')
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
        <h1>{error}</h1>
      </section>
    )
  }
  return (
    <Suspense fallback={<Loading />}>
      <section className='container'>
        {data?.id}
        {/* <BuyTickets id={id} /> */}
      </section>
    </Suspense>
  )
}
