'use client'
import { format } from '@formkit/tempo'

import CardEvent from '@/components/events/card-event'
import Loading from '@/components/ui/loading'

// state
import { eventStore } from '@/app/store/eventStore'

export default function Events() {
  const { data: events, loading } = eventStore()

  console.log(events)

  return (
    <>
      <main>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loading />
          </div>
        ) : (
          <div className=' py-5 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center align-middle'>
            {events?.map((event) => (
              <CardEvent
                key={event.id}
                location={event.locations[0]?.name}
                name={event.name}
                url={`/event/${event.id}`}
                date={format(event.date, { date: 'long' }, 'es')}
                time={format(event.date, { time: 'short' })}
                image={event.event_image}
              />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
