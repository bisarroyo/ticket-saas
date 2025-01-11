'use client'
import TicketDetails from '@/components/tickets/ticket-details'
import Loading from '@/components/ui/loading'
import useSingleTicket from '@/hooks/useSingleTicket'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams()
  const { id } = params

  const { data: ticket, loading, error } = useSingleTicket(id as string)

  console.log(ticket)

  if (error || ticket === null) return <div>Error</div>

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='flex justify-center items-center py-5 '>
          <TicketDetails
            id={ticket[0].id}
            name={ticket[0].event_id.name}
            eventDate='2023-01-01'
            eventLocation={ticket[0].event_id.locations[0].name}
            isValid
            ticketPrice={100}
            purshasedDate='2023-01-01'
            ticketHolderName={ticket[0].user_id.name}
            ticketHolderEmail={ticket[0].user_id.email}
          />
        </div>
      )}
    </>
  )
}
