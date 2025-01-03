'use client'

import { format } from '@formkit/tempo'
import CardEvent from '@/components/events/card-event'
import Loading from '@/components/ui/loading'

// state
import { eventStore } from '@/app/store/eventStore'

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

export default function Events() {
  const { data: events, loading } = eventStore()

  return (
    <main className='container mx-auto py-5'>
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <Loading />
        </div>
      ) : (
        <>
          <h1 className='text-2xl font-bold text-center mb-6'>
            Upcoming Events
          </h1>
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {events?.map((event) => {
              const locationNames = event.locations
                .map((location) => location.name)
                .join(', ') // Combina las ubicaciones en una cadena
              return (
                <CardEvent
                  key={event.id}
                  location={locationNames || 'No location available'}
                  name={event.name}
                  url={`/event/${event.id}`}
                  date={format(event.date, { date: 'long' }, 'es')}
                  time={format(event.date, { time: 'short' })}
                  image={event.event_image}
                />
              )
            })}
          </div>
        </>
      )}
    </main>
  )
}
