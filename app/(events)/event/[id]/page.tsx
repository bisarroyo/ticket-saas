'use client'

import SingleEvent from '@/components/events/single-event'
import NotFound from '@/components/ui/not-found'
import Loading from '@/components/ui/loading'

import { createClient } from '@/utils/supabase/client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const supabase = createClient()
  const [event, setEvent] = useState<EventsWithLocationType>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select(
          'name, description, id, date, event_image, aditional_info, prices, locations(name)'
        )
        .eq('id', id)
        .single()
      if (data) {
        setEvent(data)
        setLoading(false)
      }
      if (error) {
        setLoading(false)
        console.log(error)
      }
    }
    fetchData()
  }, [id, supabase])

  // Manejar errores o casos donde no se encuentre el evento
  if (loading) {
    return (
      <div className='container'>
        <Loading />
      </div>
    )
  }
  if (!id || !event) {
    return (
      <div className='container'>
        <NotFound />
      </div>
    )
  }

  // // Renderizar el evento si todo está correcto
  return (
    <section className='my-5'>
      <SingleEvent
        events={event}
        id={event.id}
        name={event.name}
        url={event.event_image}
        date={event.date}
        location={event.locations[0]?.name || 'Ubicación no disponible'}
        description={event.description}
        aditional_info={event.aditional_info || 'Sin información adicional'}
        prices={event.prices}
      />
    </section>
  )
}
