'use client'
import { cn } from '@/lib/utils'

import { addDay } from '@formkit/tempo'
import { useEffect, useState } from 'react'

import { DateInput } from '@mantine/dates'
import '@mantine/dates/styles.css'
import type { DateValue } from '@mantine/dates'
import { Calendar } from 'lucide-react'

interface InputProps {
  id: string
  value?: DateValue
  error?: string
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
  const [date, setDate] = useState<DateValue>()
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
    setDate(date)
    onChange?.(date)
  }
  return (
    <div className='flex flex-col justify-start items-start '>
      <div className='flex flex-col w-full relative'>
        <DateInput
          id={id}
          value={date}
          onChange={handleDateChange}
          minDate={min}
          maxDate={addDay(min, 360)}
          placeholder='Ingresa una fecha'
          valueFormat='DD/MM/YYYY'
          leftSection={<Calendar size={18} />}
          className={cn(
            'w-full rounded-md focus:ring-1 focus-visible:outline-none focus:outline-none focus:ring-primary-foreground/50 cursor-pointer transition-all duration-300 ',
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
