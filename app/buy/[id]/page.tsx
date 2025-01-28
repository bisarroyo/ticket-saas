'use client'
import { useParams } from 'next/navigation'
const Page = () => {
  const params = useParams()
  const { id } = params

  return <section className='container'>Page {id}</section>
}

export default Page
