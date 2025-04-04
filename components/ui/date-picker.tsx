'use client'
import { cn } from '@/lib/utils'

import { addDay } from '@formkit/tempo'
import { useEffect, useState } from 'react'

// import { Calendar } from 'lucide-react'

interface InputProps {
  id: string
  error?: string
  value?: Date
  onChange?: (date: Date | null) => void
  minDate?: Date
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
  const [date, setDate] = useState<Date>()
  const [min, setMin] = useState<Date>(minDate ?? new Date())

  useEffect(() => {
    if (value) {
      setDate(value)
    } else {
      setDate(new Date())
    }
  }, [value])
  useEffect(() => {
    if (minDate) {
      setMin(minDate)
    } else {
      setMin(new Date())
    }
  }, [minDate])

  const handleDateChange = (date: Date | null) => {
    setDate(date ?? undefined)
    onChange?.(date)
  }
  return (
    <div className='flex flex-col justify-start items-start '>
      <div className='flex flex-col w-full relative'>
        <input
          type='date'
          id={id}
          value={date ? date.toISOString().split('T')[0] : ''}
          onChange={(e) =>
            handleDateChange(e.target.value ? new Date(e.target.value) : null)
          }
          min={min.toISOString().split('T')[0]}
          max={addDay(min, 360).toISOString().split('T')[0]}
          className={cn(
            'w-full rounded-md focus:ring-1 focus-visible:outline-hidden focus:outline-hidden focus:ring-primary-foreground/50 cursor-pointer transition-all duration-300 ',
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
