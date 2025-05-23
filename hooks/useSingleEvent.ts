// useSupabase.js
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

const useSingleEvent = (id: string) => {
  const supabase = createClient()
  const [event, setEvent] = useState<SingleEvent>()
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
          .select(
            'id, name, description, prices, starts_at, ends_at, event_image, aditional_info, venues(name, city)'
          )
          .eq('id', id)
          .single()
        if (error) {
          setError('Error al obtener la información del evento')
        } else if (data) {
          console.log(data)
          setEvent({
            id: data.id,
            name: data.name,
            description: data.description,
            prices: data.prices,
            starts_at: data.starts_at,
            ends_at: data.ends_at,
            event_image: data.event_image,
            aditional_info: data.aditional_info,
            venue_id: data.venues
          })
        }
      } catch (e) {
        setError('Error al obtener la información del evento')
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, supabase])

  return { event, loading, error }
}

export default useSingleEvent
