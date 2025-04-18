import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { PostgrestError } from '@supabase/supabase-js'

// Define el estado de Zustand
interface EventState {
  data: EventsWithLocationType[]
  loading: boolean
  error: PostgrestError | null
  user: string
  fetchData: () => Promise<void>
  fetchById: (id: string) => Promise<void>
  getById: (id: string) => EventsWithLocationType | undefined
}

// Crea el cliente de Supabase
const supabase = createClient()

// Crea la tienda Zustand
export const eventStore = create<EventState>((set, get) => ({
  data: [],
  loading: true,
  error: null,
  user: '',

  fetchData: async () => {
    set({ loading: true, error: null })
    const { data, error } = await supabase
      .from('events') // Tipar explícitamente la tabla como Event
      .select(
        'name, description, id, date, event_image, aditional_info, prices, locations(name)'
      )

    if (error) {
      set({ error, loading: false })
    } else {
      set({ data: data, loading: false })
    }
  },

  fetchById: async (id: string) => {
    set({ loading: true, error: null })

    // Verificar si ya tenemos el evento en cache
    const existingEvent = get().data.find((event) => event.id === id)
    if (existingEvent) {
      set({ loading: false })
      return
    }

    const { data, error } = await supabase
      .from('events')
      .select(
        'name, description, id, date, event_image, aditional_info, locations(name)'
      )
      .eq('id', id)
      .single()

    if (error) {
      set({ error, loading: false })
    } else if (data) {
      set({ data: [...get().data, data], loading: false })
    }
  },
  getById: (id: string): EventsWithLocationType | undefined => {
    const { data } = get() // Obtener el estado actual del store
    return data.find((event) => event.id === id)
  },
  getUser: async () => {
    set({ loading: true })

    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    set({ user: user?.email })

    if (error) {
      set({ error: null, loading: false })
    } else {
      set({ loading: false })
    }
  },
  updateUser: async () => {
    const { error } = await supabase.auth.updateUser({})
    if (error) {
      console.log(error)
    }
  }
}))
