import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { PostgrestError } from '@supabase/supabase-js'

// Define el tipo para los datos de los eventos
interface Event {
  id: string
  name: string
  description: string
  date: string
  event_image: string
  aditional_info?: string
  locations: {
    id: string
    name: string
  }[]
}

// Define el estado de Zustand
interface EventState {
  data: Event[]
  loading: boolean
  error: PostgrestError | null
  fetchData: () => Promise<void>
}

// Crea el cliente de Supabase
const supabase = createClient()

// Crea la tienda Zustand
export const eventStore = create<EventState>((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null })
    const { data, error } = await supabase
      .from('events') // Tipar explícitamente la tabla como Event
      .select(
        'name, description, id, date, event_image, aditional_info, locations(id, name)'
      )

    if (error) {
      set({ error, loading: false })
    } else {
      set({ data: data || [], loading: false })
    }
  }
}))
