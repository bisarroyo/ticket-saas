// useSupabase.js
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

const useSingleEvent = (id: string | undefined) => {
  const [data, setData] = useState<EventsWithLocationType>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data, error } = await supabase
          .from('events') // Tipar explícitamente la tabla como Event
          .select(
            'name, description, id, date, event_image, aditional_info, prices, locations(name)'
          )
          .eq('id', id)
          .single()
        if (error) throw error
        setData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase, id])

  return { data, loading, error }
}

export default useSingleEvent
