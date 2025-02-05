import DatePickerComponent from '@/components/ui/date-picker'
import { useEffect, useState } from 'react'

const DateRange = () => {
  const [dateStart, setDateStart] = useState<Date>()
  const [dateEnd, setDateEnd] = useState<Date>()

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
    <>
      <DatePickerComponent
        id='date_start'
        value={dateStart}
        onChange={(date) => date && setDateStart(date)}
      />
      <DatePickerComponent
        id='date_end'
        value={dateEnd}
        minDate={dateStart}
        onChange={(date) => date && setDateEnd(date)}
      />
    </>
  )
}

export default DateRange
