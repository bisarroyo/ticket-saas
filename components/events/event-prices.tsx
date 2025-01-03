// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table'

// type Props = {
//   location: string
//   price: number
// }

// const data = [
//   {
//     location: 'Sol',
//     price: 100
//   },
//   {
//     location: 'Palco',
//     price: 200
//   },
//   {
//     location: 'Sombra',
//     price: 300
//   }
// ]

export default function EventPrices() {
  return (
    <div className='w-full'>
      <h3 className='text-2xl font-bold mb-4'>Precios</h3>
      <div className='border p-2 md:p-4 rounded-lg '>
        {/* <Table>
          <TableCaption>Lista de precios.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Ubicación</TableHead>
              <TableHead className='text-right'>Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((event) => (
              <TableRow key={event.location}>
                <TableCell className='font-medium'>{event.location}</TableCell>
                <TableCell className='text-right'>
                  $ {event.price.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </div>
    </div>
  )
}
