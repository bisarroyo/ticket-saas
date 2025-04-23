import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { useState } from 'react'

// Usa un genérico para permitir diferentes tipos de formularios
type Props<T extends FieldValues> = {
  label: string
  name: Path<T>
  control: Control<T>
}

export default function TagInput<T extends FieldValues>({
  label,
  name,
  control
}: Props<T>) {
  const [input, setInput] = useState('')

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <label className='block text-sm font-medium mb-1'>{label}</label>
          <div className='flex gap-2 mb-2'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='border px-2 py-1 rounded'
              placeholder='Ej: sin alcohol'
            />
            <button
              type='button'
              onClick={() => {
                if (input) {
                  field.onChange([...field.value, input])
                  setInput('')
                }
              }}
              className='bg-blue-600 text-white px-3 py-1 rounded'>
              Agregar
            </button>
          </div>
          <div className='flex gap-2 flex-wrap'>
            {field.value?.map((tag: string, i: number) => (
              <span
                key={i}
                className='bg-gray-200 px-2 py-1 rounded-full text-sm'>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    />
  )
}
