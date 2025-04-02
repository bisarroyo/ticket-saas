import SingleEvent from '@/components/events/single-event'
import NotFound from '@/components/ui/not-found'
// import Loading from '@/components/ui/loading'

import { createClient } from '@/utils/supabase/server'

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()

  const { data: event } = await supabase
    .from('events')
    .select(
      'name, description, id, date, event_image, aditional_info, prices, locations(name)'
    )
    .eq('id', id)
    .single()

  // Manejar errores o casos donde no se encuentre el evento
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
