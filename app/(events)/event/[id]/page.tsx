'use client'

import SingleEvent from '@/components/events/single-event'
import Loading from '@/components/ui/loading'
import NotFound from '@/components/ui/not-found'
import useSingleEvent from '@/hooks/useSingleEvent'
import { use } from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const { event, loading, error } = useSingleEvent(id)

  if (loading) {
    return (
      <div className='flex justify-center items-center'>
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
