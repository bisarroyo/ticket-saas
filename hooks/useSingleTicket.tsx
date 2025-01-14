import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { PostgrestError } from '@supabase/supabase-js'

export default function useSingleTicket(id: string) {
  const [data, setData] = useState<singleTicketSoldType[] | null>()
  const [error, setError] = useState<PostgrestError | null>()
  const [loading, setLoading] = useState<boolean>(false)

  const supabase = createClient()
  useEffect(() => {
    const fetchTickets = async () => {
      setError(null)
      setLoading(true)
      const { data: ticketData, error: ticketError } = await supabase
        .from('tickets_sold')
        .select(
          'id, status, created_at,is_active, user_id(name, email), event_id(id,name,date,locations(id,name)), payment_id(*)'
        )
        .eq('id', id)
        .is('is_active', true)
      if (ticketError) {
        setError(ticketError)
      } else {
        setData(ticketData)
      }
      setLoading(false)
    }

    fetchTickets()
  }, [id, supabase])

  return { data, error, loading }
}
