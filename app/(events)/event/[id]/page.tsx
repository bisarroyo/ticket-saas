'use client'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

import SingleEvent from '@/components/events/single-event'
import NotFound from '@/components/ui/not-found'
import Loading from '@/components/ui/loading'

import useSingleEvent from '@/hooks/useSingleEvent'

export default function Page() {
  const params = useParams()
  const id: string | undefined = Array.isArray(params.id)
    ? params.id[0]
    : params.id

  const { data: event, loading, error } = useSingleEvent(id)

  // Manejar errores o casos donde no se encuentre el evento
  if (loading) {
    return (
      <div className='container'>
        <Loading />
      </div>
    )
  }
  if (!id || !event || error) {
    return (
      <div className='container'>
        <NotFound />
      </div>
    )
  }

  // // Renderizar el evento si todo está correcto
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  )
}
