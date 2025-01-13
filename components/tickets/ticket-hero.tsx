import { Calendar, Map } from 'lucide-react'
import QRCodeGenerator from './qr-code-generator'

export default function TicketHero({
  id,
  name,
  eventDate,
  eventLocation,
  isValid
}: {
  id: string
  name: string
  eventDate: string
  eventLocation: string
  isValid: boolean
}) {
  return (
    <div className='w-full h-auto bg-white rounded-xl overflow-hidden mb-5 border-dashed border'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex justify-center items-center p-4 '>
          <QRCodeGenerator ticketId={id} />
        </div>
        <div className='flex flex-col justify-center p-4 gap-2'>
          <p className='text-xl font-bold'>{name}</p>
          <div>
            <p>Fecha</p>
            <span className='flex items-center gap-2'>
              <Calendar size={16} /> <p>{eventDate}</p>
            </span>
          </div>
          <div>
            <p>Lugar</p>
            <span className='flex items-center gap-2'>
              <Map size={16} /> <p>{eventLocation}</p>
            </span>
          </div>
          <p>{isValid}</p>
        </div>
      </div>
    </div>
  )
}
