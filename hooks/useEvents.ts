import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

const useEvents = () => {
  const [data, setData] = useState<EventsWithLocationType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data, error } = await supabase
          .from('events') // Tipar explícitamente la tabla como Event
          .select(
            'name, description, id, date, event_image, aditional_info, prices, locations(name)'
          )
        if (error) throw error
        setData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase])

  return { data, loading, error }
}

export default useEvents
