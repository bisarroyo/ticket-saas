'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function useTickets() {
  const [data, setData] = useState<TicketSoldWithLocationType[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      try {
      } catch (e) {
        setError('Error al obtener tus eventos')
        console.log(e)
      }
      const supabase = createClient()
      const { data, error: queryError } = await supabase
        .from('tickets_sold')
        .select(
          'id, created_at, status, events(id, name, event_image, date, starts_at, locations(id, name))'
        )
        .eq('is_active', true)
        .returns<TicketSoldWithLocationType[]>()
      if (queryError) {
        setError('Error al realizar la consulta')
        console.log(queryError)
        setLoading(false)
      } else {
        setData(data)
        setLoading(false)
      }
    }

    fetchTickets()
  }, []) // Este array vacío asegura que solo se ejecute una vez al montar el componente

  return { data, loading, error }
}
