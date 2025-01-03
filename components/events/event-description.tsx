type Props = {
  title: string
  description: string
}

export default function EventDescription({ title, description }: Props) {
  return (
    <div className='w-full'>
      <h3 className='text-2xl font-bold mb-4'>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
