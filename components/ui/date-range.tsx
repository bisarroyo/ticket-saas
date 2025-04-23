import DatePickerComponent from '@/components/ui/date-picker'
import { Circle, CircleDashed } from 'lucide-react'
import { useEffect, useState } from 'react'
import TimePicker from '@/components/ui/time-picker'
import { combineDateAndTime } from '@/lib/utils'
import { UseFormSetValue } from 'react-hook-form'

interface DateRangeProps {
  startName: string
  endName: string
  setValue: UseFormSetValue<{
    date_start: string
    date_end: string
    name: string
    description: string
    url: string
    capacity: number
    prices: { location: string; price: number }[]
    status?: string
    aditional_info?: string[]
  }>
  errors: {
    [key: string]: {
      message?: string
    }
  }
}

const DateRange = ({ setValue, errors }: DateRangeProps) => {
  const [dateStart, setDateStart] = useState<Date>(new Date())
  const [dateEnd, setDateEnd] = useState<Date>(new Date())

  const [timeStart, setTimeStart] = useState<string>('00:00')
  const [timeEnd, setTimeEnd] = useState<string>('00:00')

  useEffect(() => {
    if (dateEnd < dateStart) {
      setDateEnd(dateStart)
    }
    const [hoursStart, minutesStart] = timeStart.split(':').map(Number)
    const [hoursEnd, minutesEnd] = timeEnd.split(':').map(Number)
    if (dateEnd == dateStart && hoursEnd < hoursStart) {
      setTimeEnd(timeStart)
    }
    if (hoursEnd === hoursStart && minutesEnd < minutesStart) {
      setTimeEnd(timeStart)
    }

    // Combina fecha y hora y lo pasa a setValue
    const combinedStart = combineDateAndTime(dateStart, timeStart)
    const combinedEnd = combineDateAndTime(dateEnd, timeEnd)

    setValue('date_start', combinedStart.toISOString())
    setValue('date_end', combinedEnd.toISOString())
  }, [dateStart, dateEnd, timeStart, timeEnd, setValue])

  return (
    <div className='flex flex-col bg-white/30 backdrop-blur-md p-2 rounded-lg shadow-lg'>
      <div className='flex flex-col gap-4 relative'>
        <div className='absolute top-7 left-1 w-1 h-8 border-r border-dashed border-r-black/50'></div>
        <div className='flex flex-row gap-4 justify-center items-center'>
          <Circle size={16} />
          <p className='w-12 min-w-[50px]'>Inicio</p>
          <DatePickerComponent
            id='date_start'
            value={dateStart}
            onChange={(date) => date && setDateStart(date)}
            error={errors.date_start?.message}
          />
          <TimePicker
            id='time_start'
            value={timeStart}
            onChange={(time) => time && setTimeStart(time.target.value)}
          />
        </div>
        <div className='flex flex-row gap-4 justify-center items-center'>
          <CircleDashed size={16} />
          <p className='w-12 min-w-[50px]'>Fin</p>
          <DatePickerComponent
            id='date_end'
            value={dateEnd}
            minDate={dateStart}
            onChange={(date) => date && setDateEnd(date)}
            error={errors.date_end?.message}
          />
          <TimePicker
            id='time_end'
            value={timeEnd}
            minTime={timeStart}
            onChange={(time) => time && setTimeEnd(time.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default DateRange
