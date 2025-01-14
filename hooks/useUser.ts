import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function useUser() {
  const [data, setData] = useState<User>()
  const [error, setError] = useState<string | null>()
  const [loading, setLoading] = useState<boolean>(false)

  const supabase = createClient()
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (user) {
        setData(user)
      } else {
        setError('Error al obtener el usuario')
      }
      setLoading(false)
    }

    fetchTickets()
  }, [supabase])

  const updateUser = async (full_name?: string, email?: string) => {
    try {
      setLoading(true)
      const { data: updatedData, error: updatedError } =
        await supabase.auth.updateUser({
          email,
          data: {
            full_name
          }
        })
      if (updatedError) {
        setError('error al actualizar el usuario')
      } else {
        setData(updatedData.user)
      }
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  return { data, error, loading, updateUser }
}