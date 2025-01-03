import { format } from '@formkit/tempo'

import Badge from '@/components/ui/badge'
import { Calendar, CircleCheck, Clock, MapPin } from 'lucide-react'

type Props = {
  date: string
  location: string
  isAvailable: boolean
}

export default function EventDetails({ date, location, isAvailable }: Props) {
  const badgeInfo = [
    {
      title: 'Fecha',
      text: format(date, { date: 'long' }, 'es'),
      bg: 'bg-slate-100',
      icon: <Calendar size={16} />
    },
    {
      title: 'Hora',
      text: format(date, 'h:mm A', 'es'),
      bg: 'bg-slate-100',
      icon: <Clock size={16} />
    },
    {
      title: 'Lugar',
      text: location,
      bg: 'bg-slate-100',
      icon: <MapPin size={16} />
    },
    {
      title: 'Tickets',
      text: isAvailable ? 'Disponible' : 'Agotado',
      bg: isAvailable
        ? 'bg-green-200/50 dark:bg-green-700'
        : 'bg-red-200 dark:bg-red-700',
      icon: isAvailable ? <CircleCheck size={16} /> : <CircleCheck size={16} />
    }
  ]
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 '>
      {badgeInfo.map((badge) => (
        <Badge key={badge.title} {...badge} />
      ))}
    </div>
  )
}
