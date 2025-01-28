import { format } from '@formkit/tempo'
import Link from 'next/link'

import {
  CalendarDays,
  CircleAlert,
  CircleCheck,
  CircleX,
  Clock,
  Info,
  MapPin
} from 'lucide-react'
import { cn } from '@/lib/utils'

const statusSelector = {
  valid: {
    icon: <CircleCheck />,
    text: 'Válido',
    bg: 'text-available'
  },
  invalid: {
    icon: <CircleX />,
    text: 'Inválido',
    bg: 'text-red-600'
  },
  canceled: {
    icon: <CircleX />,
    text: 'Cancelado',
    bg: 'text-red-600'
  },
  redeemed: {
    icon: <Info />,
    text: 'Canjeado',
    bg: 'text-available'
  },
  pending: {
    icon: <Info />,
    text: 'Pendiente',
    bg: 'text-yellow-600'
  },
  refunded: {
    icon: <CircleAlert />,
    text: 'Reembolsado',
    bg: 'text-red-600'
  }
}

export default function CardTicket({
  eventName,
  status,
  eventDate,
  eventLocation,
  ticketId
}: {
  eventName: string
  status: TicketSoldType['status']
  eventDate: string
  eventLocation: string | null
  ticketId: string
}) {
  console.log(status)
  return (
    <Link href='/dashboard/tickets/[id]' as={`/tickets/${ticketId}`}>
      <div className='bg-white/30 backdrop-blur-md border border-foreground rounded-2xl overflow-hidden border-dashed hover:border-primary transition-border duration-300 ease-in'>
        <div className='flex justify-between items-center p-4 '>
          <p>{eventName}</p>
          <p
            className={cn(
              'flex items-center gap-1',
              statusSelector[status!].bg
            )}
          >
            {statusSelector[status!].text} {statusSelector[status!].icon}
          </p>
        </div>
        <div className='px-4 pb-4'>
          <p className='flex items-center gap-2 mb-2'>
            <CalendarDays size={20} />
            {format(eventDate, { date: 'long' }, 'es')}
          </p>
          <p className='flex items-center gap-2 mb-2'>
            <Clock size={20} />
            {format(eventDate, 'h:mm A', 'es')}
          </p>
          <p className='flex items-center gap-2'>
            <MapPin size={20} />
            {eventLocation}
          </p>
        </div>
      </div>
    </Link>
  )
}
