'use client'

import { useParams } from 'next/navigation'
import NotFound from '@/components/ui/not-found'
import SingleEvent from '@/components/events/single-event'

// state
import { eventStore } from '@/app/store/eventStore'
import Loading from '@/components/ui/loading'

// types
export interface EventData {
  name: string
  description: string
  id: string
  date: string
  event_image: string
  aditional_info: string
  locations: {
    id: string
    name: string
  }[]
}

export default function Event() {
  const params = useParams()
  const { id } = params

  const { data, loading, error } = eventStore()

  // Validar que `id` exista y sea válido
  if (!id) {
    return (
      <div className='container'>
        <NotFound />
      </div>
    )
  }

  // Buscar el evento correspondiente
  const event = data.find((event) => event.id === id)

  // Si ocurre un error en la obtención de datos
  if (error || !event) {
    return (
      <div className='container'>
        <NotFound />
      </div>
    )
  }

  return (
    <section className='my-5'>
      {loading ? (
        <Loading />
      ) : (
        <SingleEvent
          id={event.id}
          name={event.name}
          url={event.event_image}
          date={event.date}
          location={
            event.locations.length > 0
              ? event.locations.map((loc) => loc.name).join(', ') // Combinar los nombres de ubicaciones
              : 'No location available'
          }
          description={event.description}
          aditional_info={event.aditional_info}
        />
      )}
    </section>
  )
}
