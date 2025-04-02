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
}
