import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { PostgrestError } from '@supabase/supabase-js'

export default function useSingleTicket(id: string) {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('tickets_sold')
        .select(
          'id, status, created_at,user_id(name, email), event_id(id,name,date,locations(id,name)),  payment_id(ammount)'
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
  }, [id])

  return { data, error, loading }
}
