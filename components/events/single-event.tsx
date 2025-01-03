import EventHero from './event-hero'
import EventDetails from './event-details'
import EventDescription from './event-description'
// import EventLocation from './event-location'
import EventAditionalInfo from './event-aditional-info'

import Button from '@/components/ui/button'
import Link from 'next/link'
import EventPrices from './event-prices'

export default function SingleEvent({
  id,
  name,
  url,
  date,
  location,
  description,
  aditional_info
}: {
  id: string | undefined
  name: string
  url: string
  date: string
  location: string
  description: string
  aditional_info: string | undefined
}) {
  return (
    <div className=' container'>
      <div className='max-w-6xl mx-auto rounded-xl overflow-hidden flex flex-row flex-wrap gap-8'>
        <EventHero img={url} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8'>
          <div className='grid gap-8 w-full'>
            <EventDescription title={name} description={description} />
            <EventDetails date={date} location={location} isAvailable={false} />
            <Link href={`/buy/${id}`} className='w-full'>
              <Button text='Comprar entradas' />
            </Link>
          </div>
          <div>
            <EventPrices />
          </div>
        </div>
        <EventAditionalInfo text={aditional_info} />
        {/* <EventLocation /> */}
      </div>
    </div>
  )
}
