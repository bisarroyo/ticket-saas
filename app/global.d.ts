import type { Database as DB } from '@/types/database.types'

declare global {
  type Database = DB
  type EventsType = DB['public']['Tables']['events']['Row']
  type LocationsType = DB['public']['Tables']['locations']['Row']
  type TicketSoldType = DB['public']['Tables']['tickets_sold']['Row']

  interface EventsWithLocationType extends Omit<Events, 'location_id'> {
    locations: Locations
  }

  interface TicketSoldWithLocationType extends Omit<TicketSold, 'event_id'> {
    events: EventsWithLocation
    user: 
  }
}
