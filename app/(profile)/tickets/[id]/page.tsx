'use client'
import TicketDetails from '@/components/tickets/ticket-details'
import Loading from '@/components/ui/loading'
import useSingleTicket from '@/hooks/useSingleTicket'
import { useParams } from 'next/navigation'
import { format } from '@formkit/tempo'

export default function Page() {
  const params = useParams()
  const { id } = params

  const { data: ticket, loading, error } = useSingleTicket(id as string)

  if (loading) {
    return <Loading />
  }

  if (error || !ticket || ticket.length === 0) {
    return <div>Error</div>
  }
  console.log(ticket)

  const ticketInfo = ticket[0]

  return (
    <div className='flex justify-center items-center py-5 '>
      <TicketDetails
        id={ticketInfo.id}
        name={ticketInfo.event_id.name}
        eventDate={format(ticketInfo.event_id.date, { date: 'long' }, 'es')}
        eventLocation={ticketInfo.event_id.locations[0].name}
        isValid={ticketInfo.is_active}
        ticketPrice={100} //need to check the price from db
        purshasedDate={format(ticketInfo.created_at, { date: 'long' }, 'es')}
        ticketHolderName={ticketInfo.user_id.name}
        ticketHolderEmail={ticketInfo.user_id.email}
      />
    </div>
  )
}
