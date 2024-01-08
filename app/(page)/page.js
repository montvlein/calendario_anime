'use client'
import CalendarHeader from '@components/Header'
import AsideMenu from '@components/Aside'
import { useContextHook } from '../client/context/contextHook';

export default function Home() {

  const {
    selectedViewType
  } =  useContextHook()

  return (
    <main className="flex h-screen flex-col">
      <CalendarHeader />
      <div className="isolate flex flex-auto overflow-hidden bg-white divide-x">
        <AsideMenu />
        <section className='flex-1 overflow-y-scroll'>
          <Calendar calendarType={selectedViewType} />
        </section>
      </div>
    </main>
  )
}

import DayCalendar from '@components/Calendar/day'
import WeekCalendar from '@components/Calendar/week'
import SeasonCalendar from '@components/Calendar/season'

function Calendar({calendarType}) {

  const {
    calendarTypes
  } =  useContextHook()

  switch (calendarType) {
    case calendarTypes.day:
      return <DayCalendar/>
    case calendarTypes.week:
      return <WeekCalendar />
    case calendarTypes.season:
      return <SeasonCalendar />
    default:
      break;
  }
}