// useSupabase.js
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()
const useSingleEvent = (id: string) => {
  const [event, setEvent] = useState<EventsType>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single()
        if (error) {
          setError('Error al obtener la información del evento')
        } else if (data) {
          setEvent(data)
        }
      } catch (e) {
        setError('Error al obtener la información del evento')
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  return { event, loading, error }
}

export default useSingleEvent
