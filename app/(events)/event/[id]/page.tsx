'use client'

import { useParams } from 'next/navigation'
import SingleEvent from '@/components/events/single-event'
import NotFound from '@/components/ui/not-found'
import Loading from '@/components/ui/loading'

// Zustand store
import { eventStore } from '@/app/store/eventStore'

export default function Event() {
  const params = useParams()
  const { id } = params

  const { getById, data, loading, error } = eventStore()

  // Mostrar el componente de carga si aún no se han cargado los datos
  if (loading) {
    return (
      <div className='container'>
        <Loading />
      </div>
    )
  }

  // Manejar errores o casos donde no se encuentre el evento
  const event = id ? getById(id.toString()) : null
  console.log(data)
  if (error || !id || !event) {
    return (
      <div className='container'>
        <NotFound />
      </div>
    )
  }

  // Renderizar el evento si todo está correcto
  return (
    <section className='my-5'>
      <SingleEvent
        id={event.id}
        name={event.name}
        url={event.event_image}
        date={event.date}
        location={event.locations[0]?.name || 'Ubicación no disponible'}
        description={event.description}
        aditional_info={event.aditional_info || 'Sin información adicional'}
      />
    </section>
  )
}
