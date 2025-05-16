import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()
const useEvents = () => {
  const [data, setData] = useState<EventsWithLocationType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

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
        if (error) {
          setError('Error al cargar los eventos')
        } else if (data) {
          setData(data)
        }
      } catch (e) {
        setError('Error al obtener la información de los eventos')
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export default useEvents
