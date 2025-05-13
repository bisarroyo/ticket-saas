'use client'

import Events from '@/components/events/events'
import PageLoader from '@/components/page-loader'
import { useState } from 'react'

export default function Page() {
  const [loading, setLoading] = useState(false)
  return (
    <section className='container my-5 max-w-6xl'>
      <h1>Eventos</h1>
      <Events showLoading={setLoading} />
      <PageLoader loading={loading} />
    </section>
  )
}
