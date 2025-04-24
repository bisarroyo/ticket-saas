export interface FormValues {
  date_start: string
  date_end: string
  name: string
  description: string
  url: string
  capacity: number
  prices: { location: string; price: number }[]
  status?: string
  aditional_info?: string[]
}
