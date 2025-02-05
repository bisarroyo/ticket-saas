'use client'
import { cn } from '@/lib/utils'

import { addDay } from '@formkit/tempo'
import { useEffect, useState } from 'react'

import 'react-datepicker/dist/react-datepicker.css'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  id: string
  value?: string
  error?: string
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void
  minDate?: string
  className?: string
}

const DatePickerComponent: React.FC<InputProps> = ({
  id,
  error,
  value,
  onChange,
  minDate,
  className,
  ...props
}) => {
  const [date, setDate] = useState<string>(value ?? '')
  const [min, setMin] = useState<string>(minDate ?? '')

  useEffect(() => {
    if (value) {
      setDate(value)
    } else {
      setDate(new Date().toISOString().split('T')[0])
    }
  }, [value])
  useEffect(() => {
    if (minDate) {
      setMin(minDate)
    } else {
      setMin(new Date().toISOString().split('T')[0])
    }
  }, [minDate])
  return (
    <div className='flex flex-col justify-start items-start '>
      <div className='flex flex-col w-full relative'>
        <input
          type='date'
          id={id}
          value={date ?? ''}
          onChange={(e) => {
            setDate(e.target.value)
            if (onChange) onChange(e)
          }}
          min={min}
          max={addDay(min, 360).toISOString().split('T')[0]}
          className={cn(
            'px-4 py-2 border rounded-md focus:ring-1 focus-visible:outline-none focus:outline-none focus:ring-primary-foreground/50 cursor-pointer transition-all duration-300 ',
            error && 'border-danger focus:ring-danger',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className='text-red-500 text-sm w-full'>
          {error && <span>{error}</span>}
        </p>
      )}
    </div>
  )
}

export default DatePickerComponent
