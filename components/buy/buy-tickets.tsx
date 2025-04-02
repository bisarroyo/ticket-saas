'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

interface BuyTicketsProps {
  id: string
}

const BuyTickets: React.FC<BuyTicketsProps> = ({ id }) => {
  const [prices, setPrices] = useState<
    { location: string; price: number }[] | undefined
  >()

  const supabase = createClient()

  useEffect(() => {
    const fetchPrices = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('prices')
        .eq('id', id)
        .single()
      if (error) {
        console.log(error)
      }
      if (data?.prices) {
        try {
          const parseData = JSON.parse(data?.prices as string)
          setPrices(parseData)
        } catch (e) {
          console.log(e)
        }
      }
    }
    fetchPrices()
  }, [id, supabase])
  return (
    <div>
      <h1>Buy Tickets</h1>
      <div>
        <Table>
          <TableCaption>Lista de precios.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Ubicación</TableHead>
              <TableHead className='text-right'>Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices?.map((event, index) => (
              <TableRow key={index}>
                <TableCell className='font-medium'>{event?.location}</TableCell>
                <TableCell className='text-right'>$ {event?.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default BuyTickets
