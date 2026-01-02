import { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isBefore, startOfDay } from 'date-fns'
import { isDataOcupada } from '../utils/storage'
import './Calendar.css'

const Calendar = ({ quartoId, checkIn, checkOut, onDateSelect, disabledDates = [], selectingCheckIn = true }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isSelectingCheckIn, setIsSelectingCheckIn] = useState(selectingCheckIn)

  useEffect(() => {
    setIsSelectingCheckIn(selectingCheckIn)
  }, [selectingCheckIn])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const handleDateClick = (day) => {
    const today = startOfDay(new Date())
    const dayStart = startOfDay(day)
    
    if (isBefore(dayStart, today)) return
    
    if (isSelectingCheckIn) {
      // Selecionando check-in - sempre define novo check-in
      onDateSelect(day, null)
    } else {
      // Selecionando check-out - só define check-out se já tiver check-in e a data for depois
      if (!checkIn) {
        // Se não tem check-in, não faz nada (ou poderia mostrar um aviso)
        return
      }
      if (day <= checkIn) {
        // Se a data selecionada é antes ou igual ao check-in, não faz nada
        return
      }
      // Define o check-out mantendo o check-in existente
      onDateSelect(checkIn, day)
    }
  }

  const isDateDisabled = (day) => {
    const today = startOfDay(new Date())
    const dayStart = startOfDay(day)
    
    if (isBefore(dayStart, today)) return true
    
    // Se está selecionando check-out, desabilita datas antes ou iguais ao check-in
    if (!isSelectingCheckIn && checkIn) {
      const checkInStart = startOfDay(checkIn)
      if (dayStart <= checkInStart) return true
    }
    
    if (isDataOcupada(day, quartoId)) return true
    
    if (disabledDates.some(d => isSameDay(d, day))) return true
    
    return false
  }

  const isDateInRange = (day) => {
    if (!checkIn || !checkOut) return false
    return day >= checkIn && day <= checkOut
  }

  const isDateSelected = (day) => {
    return (checkIn && isSameDay(day, checkIn)) || (checkOut && isSameDay(day, checkOut))
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="calendar-nav">
          ‹
        </button>
        <h3 className="calendar-month">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="calendar-nav">
          ›
        </button>
      </div>
      <div className="calendar-weekdays">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
      </div>
      <div className="calendar-days">
        {daysInMonth.map(day => {
          const disabled = isDateDisabled(day)
          const inRange = isDateInRange(day)
          const selected = isDateSelected(day)
          const isCurrentMonth = isSameMonth(day, currentMonth)
          
          return (
            <button
              key={day.toString()}
              className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${disabled ? 'disabled' : ''} ${inRange ? 'in-range' : ''} ${selected ? 'selected' : ''}`}
              onClick={() => !disabled && handleDateClick(day)}
              disabled={disabled}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar

