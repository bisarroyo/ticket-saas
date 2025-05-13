import SingleEvent from '@/components/events/single-event'
import NotFound from '@/components/ui/not-found'

import { createClient } from '@/utils/supabase/server'

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()
  console.log('event', event)
  console.log('error', error)
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
