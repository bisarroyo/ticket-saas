import { Banknote, Calendar, CircleUser, KeyRound, Mail } from 'lucide-react'

export default function TicketBody({
  id,
  ticketPrice,
  purshasedDate,
  ticketHolderName,
  ticketHolderEmail
}: {
  id: string
  ticketPrice: number
  purshasedDate: string
  ticketHolderName: string | null
  ticketHolderEmail: string | null
}) {
  return (
    <div className='p-5 w-full h-auto bg-white border border-dashed rounded-xl'>
      <p className='text-xl font-bold mb-5'>Detalles</p>
      <div className='mb-4'>
        <p className='font-bold'>Propietario</p>
        <span className='flex items-center gap-2'>
          <CircleUser size={16} /> <p>{ticketHolderName}</p>
        </span>
        <span className='flex items-center gap-2'>
          <Mail size={16} /> <p>{ticketHolderEmail}</p>
        </span>
      </div>
      <div className='mb-4'>
        <p className='font-bold'>Fecha de compra</p>
        <span className='flex items-center gap-2'>
          <Calendar size={16} /> <p>{purshasedDate}</p>
        </span>
      </div>
      <div className='mb-4'>
        <p className='font-bold'>Precio</p>
        <span className='flex items-center gap-2'>
          <Banknote size={16} /> <p>${ticketPrice}</p>
        </span>
      </div>
      <div className='mb-4'>
        <p className='font-bold'>Ticket ID</p>
        <span className='flex items-center gap-2'>
          <KeyRound size={16} /> <p>{id}</p>
        </span>
      </div>
    </div>
  )
}
