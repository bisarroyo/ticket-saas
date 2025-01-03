export interface EventData {
  name: string
  description: string
  id: string
  date: string
  event_image: string
  aditional_info: string
  locations: {
    id: string
    name: string
  }
}
