// import { Clock3 } from 'lucide-react'

interface InputProps {
  id: string
  value: string
  onChange: (time: React.ChangeEvent<HTMLInputElement>) => void
  minTime?: string
}

const TimePicker: React.FC<InputProps> = ({ id, value, onChange, minTime }) => {
  return (
    <input
      id={id}
      type='time'
      min={minTime ?? '00:00'}
      max={'23:59'}
      onChange={(time) => time && onChange(time)}
      value={value}
      className='w-[120px]'
    />
  )
}

export default TimePicker
