'use client'
import useTickets from '@/hooks/useTickets'

import CardTicket from './card-ticket'
import Loading from '../ui/loading'

export default function Tickets() {
  const { data, loading, error } = useTickets()
  if (error) return <div>Error</div>

  return (
    <>
      {loading ? (
        <div className='container'>
          <Loading />
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 max-w-2xl w-full'>
          {data?.map((ticket) => (
            <CardTicket
              key={ticket.id}
              eventName={ticket.events.name}
              status={ticket.status}
              eventDate={ticket.events.date}
              eventLocation={ticket.events.locations[0].name}
              ticketId={ticket.id}
            />
          ))}
        </div>
      )}
    </>
  )
}
