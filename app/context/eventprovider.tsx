'use client'

import { useEffect } from 'react'
// state
import { eventStore } from '@/app/store/eventStore'

export default function EventProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { fetchData } = eventStore()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return <>{children}</>
}
