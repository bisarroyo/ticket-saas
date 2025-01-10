import TicketHero from './ticket-hero'
import TicketHeader from './ticket-header'
import TicketBody from './ticket-body'

export default function TicketDetails({
  id,
  name,
  eventDate,
  eventLocation,
  isValid,
  ticketPrice,
  purshasedDate,
  ticketHolderName,
  ticketHolderEmail
}: {
  id: string
  name: string
  eventDate: string
  eventLocation: string
  isValid: boolean
  ticketPrice: number
  purshasedDate: string
  ticketHolderName: string
  ticketHolderEmail: string
}) {
  return (
    <div className='max-w-2xl w-full h-auto '>
      <TicketHeader />
      <TicketHero
        image='https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'
        id='123456789'
        name='Ticket name'
        eventDate='2023-01-01'
        eventLocation='Madrid'
        isValid={true}
      />
      <TicketBody
        id='123456789'
        ticketPrice={100}
        purshasedDate='2023-01-01'
        ticketHolderName='Ticket holder name'
        ticketHolderEmail='ticketholder@email.com'
      />
    </div>
  )
}
