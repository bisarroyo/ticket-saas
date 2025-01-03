'use client'

import Image from 'next/image'
export default function EventHero({ img }: { img: string }) {
  return (
    <div className='w-full'>
      <Image
        src={img}
        priority={true}
        alt='Imagen del evento'
        height='494'
        width='1152'
        className='w-full object-cover aspect-[21/9] transition-opacity duration-500'
      />
    </div>
  )
}
