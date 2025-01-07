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
    name: string
  }[]
}

// Define el estado de Zustand
interface EventState {
  data: Event[]
  loading: boolean
  error: PostgrestError | null
  fetchData: () => Promise<void>
  fetchById: (id: string) => Promise<void>
  getById: (id: string) => Event | undefined
}

// Crea el cliente de Supabase
const supabase = createClient()

// Crea la tienda Zustand
export const eventStore = create<EventState>((set, get) => ({
  data: [],
  loading: true,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null })
    const { data, error } = await supabase
      .from('events') // Tipar explícitamente la tabla como Event
      .select(
        'name, description, id, date, event_image, aditional_info, locations(name)'
      )

    if (error) {
      set({ error, loading: false })
    } else {
      set({ data: data, loading: false })
    }
  },

  fetchById: async (id: string) => {
    set({ loading: true, error: null })
    const { data, error } = await supabase
      .from('events')
      .select(
        'name, description, id, date, event_image, aditional_info, locations(name)'
      )
      .eq('id', id)
      .single() // Solo queremos un resultado

    if (error) {
      set({ error, loading: false })
    } else if (data) {
      // Verifica si el evento ya está en el store antes de agregarlo
      const currentData = get().data
      const exists = currentData.some((event) => event.id === data.id)
      if (!exists) {
        set({ data: [...currentData, data], loading: false })
      } else {
        set({ loading: false })
      }
    }
  },
  getById: (id: string) => {
    const { data } = get() // Obtener el estado actual del store
    return data.find((event) => event.id === id)
  }
}))
