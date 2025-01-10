'use client'
import TicketDetails from '@/components/tickets/ticket-details'
import Loading from '@/components/ui/loading'
import useSingleTicket from '@/hooks/useSingleTicket'
import { useParams } from 'next/navigation'
export default function page() {
  const params = useParams()
  const { id } = params

  // const { data, loading, error } = useSingleTicket(id as string)

  // if (error) return <div>Error</div>
  const loading = false

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='flex justify-center items-center py-5 '>
          <TicketDetails
            id='1'
            name='Evento'
            eventDate='2023-01-01'
            eventLocation='Madrid'
            isValid
            ticketPrice={100}
            purshasedDate='2023-01-01'
            ticketHolderName='Bisarroyo'
            ticketHolderEmail='bisarroyo@gmail.com'
          />
        </div>
      )}
    </>
  )
}
