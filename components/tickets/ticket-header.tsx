import { ArrowLeft, Download, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function TicketHeader() {
  return (
    <div className='pb-5 flex justify-between items-center'>
      <Link href='/tickets'>
        <p className='flex  items-center gap-2'>
          <ArrowLeft size={20} /> Volver{' '}
          <span className='hidden md:block'>a todos los tickets</span>
        </p>
      </Link>
      <div className='flex justify-between items-center gap-2 md:gap-4'>
        <Link href='/tickets'>
          <p className='flex items-center  gap-2'>
            <Download size={20} /> Descargar
          </p>
        </Link>
        <Link href='/tickets'>
          <p className='flex items-center gap-2'>
            <Share2 size={20} /> Compartir
          </p>
        </Link>
      </div>
    </div>
  )
}
