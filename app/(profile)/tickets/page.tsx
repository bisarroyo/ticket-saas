import Tickets from '@/components/tickets/tickets'

function page() {
  return (
    <>
      <h1 className='text-center my-5'>Tickets</h1>
      <div className=' flex justify-center items-center'>
        <Tickets />
      </div>
    </>
  )
}

export default page
