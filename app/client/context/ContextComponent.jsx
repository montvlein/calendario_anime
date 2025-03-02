'use client'

import { useState } from 'react';
import CalendarContext from './contextHook'
import { useLatestAnimeList } from '../hooks/getLastestAnimeList'

export function AppContext({ children }) {

  const seasons = {
    "enero" : {es: "verano", en: "winter"},
    "febrero" : {es: "verano", en: "winter"},
    "marzo" : {es: "verano", en: "winter"},

    "abril" : {es: "otoño", en: "spring"},
    "mayo" : {es: "otoño", en: "spring"},
    "junio" : {es: "otoño", en: "spring"},

    "julio" : {es: "invierno", en: "summer"},
    "agosto" : {es: "invierno", en: "summer"},
    "septiembre" : {es: "invierno", en: "summer"},

    "octubre" : {es: "primavera", en: "fall"},
    "noviembre" : {es: "primavera", en: "fall"},
    "diciembre" : {es: "primavera", en: "fall"},
  }

  const calendarTypes = {
    day: "día",
    week: "semana",
    season: "temporada"
  }
  const calendarTypeList = Object.values(calendarTypes)
  const [ selectedViewType, setView ] = useState(calendarTypes.week)
  const [ selectedDay, setSelectedDay ] = useState(new Date())
  const [ selectedWeek, setSelectedWeek ] = useState(new Date())
  const [ selectedSeason, setSelectedSeason ] = useState(new Date())

  const weekday = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
  const getWeekDay = weekday[selectedDay.getDay()]

  const { animeList, loading, error } = useLatestAnimeList()

  return (
    <CalendarContext.Provider value={{
        calendarTypes, calendarTypeList,
        selectedViewType, setView,
        selectedDay, setSelectedDay, getWeekDay,
        seasons,
        selectedWeek, setSelectedWeek,
        selectedSeason, setSelectedSeason,
        animeList, loading, error
     }}>
      { children }
    </CalendarContext.Provider>
  );
}
