'use client'
import CalendarHeader from '@components/Header'
import AsideMenu from '@components/Aside'

export default function Home() {
  return (
    <main className="flex h-screen flex-col">
      <CalendarHeader />
      <div className="isolate flex flex-auto overflow-hidden bg-white divide-x">
        <AsideMenu />
        <section className='flex-1 overflow-y-scroll'>
          <Calendar calendarType={"week"} />
        </section>
      </div>
    </main>
  )
}

import DayCalendar from '@components/Calendar/day'
import WeekCalendar from '@components/Calendar/week'
import SeasonCalendar from '@components/Calendar/season'

function Calendar({calendarType}) {
  switch (calendarType) {
    case "day":
      return <DayCalendar/>
    case "week":
      return <WeekCalendar />
    case "season":
      return <SeasonCalendar />
    default:
      break;
  }
}