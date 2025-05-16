'use client'

import SingleEvent from '@/components/events/single-event'
import NotFound from '@/components/ui/not-found'

import { createClient } from '@/utils/supabase/client'
import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const [event, setEvent] = useState<EventsType | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()
      if (data) {
        setEvent(data)
      }
      if (error) {
        setError(error)
        console.log('Error fetching event:', error)
      }
    }
    if (id) {
      fetchEvent()
    }
  }, [id])

  if (!id || !event || error) {
    return (
      <div className='container'>
        <NotFound />
      </div>
    )
  }

  return (
    <section className='my-5'>
      <SingleEvent
        events={event}
        id={event.id}
        name={event.name}
        url={event.event_image}
        date={event.date}
        location={'Ubicación no disponible'}
        description={event.description}
        aditional_info={event.aditional_info || 'Sin información adicional'}
        prices={event.prices}
      />
    </section>
  )
}
