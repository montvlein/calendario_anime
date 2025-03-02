'use client'

import { useState, useEffect } from 'react';
import { useContextHook } from '../context/contextHook'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

export default function AsideMenu() {

    const { selectedDay, setSelectedDay } = useContextHook()

    const [value, setValue] = useState(dayjs(selectedDay));

    const handleChange = (newValue) => {
      const date =  new Date(new Date(newValue.$y, newValue.$M, newValue.$D))
      setSelectedDay(date)
    }

    useEffect(()=>{
      setValue(dayjs(selectedDay))
    }, [selectedDay])

    return(
        <aside className="hidden w-1/2 max-w-md text-gray-500 flex-none bg-gray-50 border-l border-gray-100 px-8 py-10 ">
        <DateCalendar
          showDaysOutsideCurrentMonth
          value={value} onChange={handleChange}
          views={['year', 'month', 'day']}
        />
      </aside>
    )
}