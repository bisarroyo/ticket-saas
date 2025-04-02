// import BuyTickets from '@/components/buy/buy-tickets'

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <section className='container'>
      <div>{id}</div>
      {/* {id ? <BuyTickets id={id} /> : <p>Error: Invalid or missing ID</p>} */}
    </section>
  )
}
