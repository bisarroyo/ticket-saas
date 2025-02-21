import DatePickerComponent from '@/components/ui/date-picker'
import { Circle, CircleDashed } from 'lucide-react'
import { useEffect, useState } from 'react'
import TimePicker from '@/components/ui/time-picker'

const DateRange = () => {
  const [dateStart, setDateStart] = useState<Date>()
  const [dateEnd, setDateEnd] = useState<Date>()

  const [timeStart, setTimeStart] = useState<string>('00:00')
  const [timeEnd, setTimeEnd] = useState<string>('00:00')

  useEffect(() => {
    if (dateEnd && dateStart && dateEnd < dateStart) {
      setDateEnd(dateStart)
      console.log('update')
    }
  }, [dateStart, dateEnd])
  useEffect(() => {
    const date = new Date()
    setDateStart(date)
    setDateEnd(date)
  }, [])
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
