type Props = {
  details: string[] | undefined
}

export default function EventAditionalInfo({ details }: Props) {
  return (
    <div className=''>
      <h3>Información adicional</h3>
      <ul>
        {details?.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </div>
  )
}
