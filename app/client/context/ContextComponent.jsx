'use client'
import { useState } from 'react';
import CalendarContext from './contextHook'

export function AppContext({ children }) {

  const calendarTypes = {
    day: "día",
    week: "semana",
    season: "temporada"
  }
  const calendarTypeList = Object.values(calendarTypes)
  const [ selectedViewType, setView ] = useState(calendarTypes.week)
  const [ selectedDay, setSelectedDay ] = useState(new Date())

  const weekday = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
  const getWeekDay = weekday[selectedDay.getDay()]

  return (
    <CalendarContext.Provider value={{
        calendarTypes, calendarTypeList,
        selectedViewType, setView,
        selectedDay, setSelectedDay, getWeekDay
     }}>
      { children }
    </CalendarContext.Provider>
  );
}

