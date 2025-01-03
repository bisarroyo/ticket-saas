import { Calendar, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  location: string
  name: string
  url: string
  date: string
  time: string
  image: string
}

export default function CardEvent({
  location,
  name,
  url,
  date,
  time,
  image
}: Props) {
  return (
    <Link href={url}>
      <div className='border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out'>
        <div className='aspect-[16/9]'>
          <Image
            src={image}
            width={500}
            height={300}
            alt=''
            className='w-full h-full object-cover'
          />
        </div>
        <div className='p-4'>
          <h3 className='text-2xl font-bold mb-4'>{name}</h3>
          <div className='flex items-center gap-2'>
            <MapPin size={16} />
            <p className='text-md'>{location}</p>
          </div>
          <div className='flex items-center gap-2'>
            <Calendar size={16} />
            <p className='text-md'>{date}</p>
          </div>
          <div className='flex items-center gap-2'>
            <Clock size={16} />
            <p className='text-md'>{time}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
