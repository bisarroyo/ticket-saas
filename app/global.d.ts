import type { Database as DB } from '@/types/database.types'

declare global {
  type Database = DB
  type EventsType = DB['public']['Tables']['events']['Row']
  type LocationsType = DB['public']['Tables']['locations']['Row']
  type TicketSoldType = DB['public']['Tables']['tickets_sold']['Row']
  type UsersType = DB['public']['Tables']['user_profiles']['Row']
  type PaymentsType = DB['public']['Tables']['payments']['Row']
  type BuyTableData = DB['public']['Tables']['events']['Row']['prices']

  interface EventsWithLocationType extends Omit<Events, 'location_id'> {
    locations: Locations[]
  }

  interface TicketSoldWithLocationType extends Omit<TicketSold, 'event_id'> {
    events: EventsWithLocation
  }
  interface singleTicketSoldType
    extends Omit<TicketSold, 'event_id' | 'user_id' | 'payment_id'> {
    event_id: EventsWithLocation
    user_id: {
      name: string | null
      email: string | null
    }
    payment_id: PaymentsType
  }

  //Types for get all events
  type AllEvents = {
    id: string
    name: string
    date: string
    starts_at: string
    event_image: string
    venue_id: {
      name: string
    }
  }
  // typews for single event
  type SingleEvent = {
    id: string
    name: string
    description: string | null
    prices: Json | null
    starts_at: string
    ends_at: string
    event_image: string
    aditional_info: Json[] | null
    venue_id: {
      name: string
      city: string | null
    }
  }
  // types for buy tickets
  type BuyEvent = {
    id: string
    name: string
    map: boolean
    prices: Json | null
    starts_at: string
    ends_at: string
    event_image: string
    aditional_info: Json[] | null
    display_map: bool
    venue_id: {
      name: string
      city: string | null
      sections: {
        id: string
        name: string
        price: number
        color: string
        seats: {
          id: string
          event_seats: {
            id: string
          }[]
        }[]
      }[]
    }
  }
}
