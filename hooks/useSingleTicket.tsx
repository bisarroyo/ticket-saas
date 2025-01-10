import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function useSingleTicket(id: string) {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('tickets_sold')
        .select(
          'id,auth.users(*), events(id,name,date,location_id(id,name)), status, created_at, payment_id(ammount)'
        )
        .eq('id', id)
        .is('is_active', true)
      if (error) {
        setError(error)
        setLoading(false)
      } else {
        setData(data)
        setLoading(false)
      }
    }

    fetchTickets()
  }, [id]) // Este array vacío asegura que solo se ejecute una vez al montar el componente

  return { data, error, loading }
}
