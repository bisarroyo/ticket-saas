'use client'

import { useEffect, useState } from 'react'

interface PageLoaderProps {
  loading: boolean
}

export default function PageLoader({ loading }: PageLoaderProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Retraso leve para evitar parpadeo si la carga es muy rápida
    if (loading) {
      const timeout = setTimeout(() => setVisible(true), 100)
      return () => clearTimeout(timeout)
    } else {
      setVisible(false)
    }
  }, [loading])

  if (!visible) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin' />
    </div>
  )
}
