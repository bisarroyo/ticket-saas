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
  ticketHolderName: string | null
  ticketHolderEmail: string | null
}) {
  return (
    <div className='max-w-2xl w-full h-auto '>
      <TicketHeader />
      <TicketHero
        image='https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'
        id={id}
        name={name}
        eventDate={eventDate}
        eventLocation={eventLocation}
        isValid={isValid}
      />
      <TicketBody
        id={id}
        ticketPrice={ticketPrice}
        purshasedDate={purshasedDate}
        ticketHolderName={ticketHolderName}
        ticketHolderEmail={ticketHolderEmail}
      />
    </div>
  )
}
