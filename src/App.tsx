import { useState,useReducer ,useRef, useEffect} from 'react'
import Calendar from './components/Calendar'
import './App.css'

interface CalendarRef {
  setDate: (date: Date) => void
  getDate: () => Date
}
function App() {
  const calendarRef = useRef<CalendarRef>(null)
  useEffect(() => {
    console.log('--------');
    console.log(calendarRef.current?.getDate().toLocaleDateString());
    console.log('--------');
  },[])

  return (
    <Calendar ref={calendarRef} defaultValue={new Date('2024-01-01')} onChange={(date) => {
      console.log(date.toLocaleDateString());
    }}></Calendar>
  )
}

export default App
