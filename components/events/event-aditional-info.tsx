type Props = {
  text: string | undefined
}

export default function EventAditionalInfo({ text }: Props) {
  return (
    <div className=''>
      <h3>Información adicional</h3>
      <p>{text}</p>
    </div>
  )
}
