import EventHero from './event-hero'
import EventDetails from './event-details'
import EventDescription from './event-description'
// import EventLocation from './event-location'
import EventAditionalInfo from './event-aditional-info'

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
    <div className='container'>
      <div className='max-w-4xl grid grid-cols-1  gap-x-8 gap-y-12 mx-auto'>
        <EventHero img={url} isAvailable={true} />
        <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 lg:gap-8'>
          <div className='w-full flex flex-col justify-center md:justify-start md:items-start items-center'>
            <EventDetails date={date} location={location} isAvailable={false} />
            <Link
              href={`/buy/${id}`}
              className='bg-primary text-primary-foreground border-primary shadow-xl hover:bg-primary/50 text-md py-2 px-4 text-center border rounded-md w-full focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Comprar Entradas
            </Link>
          </div>
          <div className='grid gap-8 w-full'>
            <EventDescription title={name} description={description} />
            <EventPrices />
            <EventAditionalInfo text={aditional_info} />
          </div>
        </div>
      </div>
    </div>
    // <div className=' container'>
    //   <div className='max-w-6xl mx-auto rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8'>
    //     <EventHero img={url} />
    //     <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8'>
    //       <div className='grid gap-8 w-full'>
    //         <EventDescription title={name} description={description} />
    //         <EventDetails date={date} location={location} isAvailable={false} />
    //         <Link href={`/buy/${id}`} className='w-full'>
    //
    //         </Link>
    //       </div>
    //       <div>
    //         <EventPrices />
    //       </div>
    //     </div>
    //     <EventAditionalInfo text={aditional_info} />
    //     {/* <EventLocation /> */}
    //   </div>
    // </div>
  )
}
