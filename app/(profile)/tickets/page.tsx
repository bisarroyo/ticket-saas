import Tickets from '@/components/tickets/tickets'

function page() {
  return (
    <div className='container max-w-xl mx-auto'>
      <h1 className='text-center my-5 '>Tickets</h1>
      <div className=' flex justify-center items-center'>
        <Tickets />
      </div>
    </div>
  )
}

export default page
