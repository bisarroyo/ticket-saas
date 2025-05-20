// useSupabase.js
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

const useBuyTickets = (id: string) => {
  const supabase = createClient()
  const [event, setEvent] = useState<BuyEvent>()
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
            'id, name, map, prices, starts_at, ends_at, event_image, aditional_info, display_map, venues(name, city, sections(id, name, price, color, seats(id, event_seats(id))))'
          )
          .eq('id', id)
          .single()
        if (error) {
          setError('Error al obtener la información del evento')
        } else if (data) {
          setEvent({
            id: data.id,
            name: data.name,
            map: data.map,
            prices: data.prices,
            starts_at: data.starts_at,
            ends_at: data.ends_at,
            event_image: data.event_image,
            aditional_info: data.aditional_info,
            display_map: data.display_map,
            venue_id: {
              name: data.venues.name,
              city: data.venues.city,
              sections: [...data.venues.sections]
            }
          })
          // setEvent(data.venues.sections)
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

export default useBuyTickets
