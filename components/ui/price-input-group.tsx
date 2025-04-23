import InputClient from './input-client'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

// Define la estructura de tu formulario
interface FormValues {
  date_start: string
  date_end: string
  name: string
  description: string
  url: string
  capacity: number
  prices: { location: string; price: number }[]
  status?: string
  aditional_info?: string[]
  // otros campos si los hay
}

type Props = {
  index: number
  register: UseFormRegister<FormValues>
  remove: (index: number) => void
  errors: FieldErrors<FormValues>
}

export default function PriceInputGroup({
  index,
  register,
  remove,
  errors
}: Props) {
  return (
    <div className='flex gap-2 items-end'>
      <InputClient
        id={`prices.${index}.location`}
        type='text'
        placeholder='Ubicación'
        {...register(`prices.${index}.location`)}
        error={errors?.prices?.[index]?.location?.message}
      />
      <InputClient
        id={`prices.${index}.price`}
        type='number'
        placeholder='Precio'
        {...register(`prices.${index}.price`, { valueAsNumber: true })}
        error={errors?.prices?.[index]?.price?.message}
      />
      <button
        type='button'
        onClick={() => remove(index)}
        className='text-red-500 text-sm cursor-pointer'>
        Quitar
      </button>
    </div>
  )
}
