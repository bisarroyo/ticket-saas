'use client'
import { useParams } from 'next/navigation'
const Page = () => {
  const params = useParams()
  const { user } = params

  return <section className='container'>Page {user}</section>
}

export default Page
