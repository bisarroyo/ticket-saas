'use client'
import Events from '@/components/events/events'

import { eventStore } from '@/app/store/eventStore'
import { useEffect } from 'react'

export default function Index() {
  const { fetchData } = eventStore()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <section className=' container my-5'>
      <h1>Próximos eventos</h1>
      <Events />
    </section>
  )
}
