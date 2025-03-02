'use client'
import {  useEffect, useRef, useState } from 'react'
import { useContextHook } from '../../context/contextHook'

export default function WeekCalendar() {
  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)

  const {
    selectedDay
  } = useContextHook()

  const [dateView, setWeekView ] = useState([])

  function resDays(date, days) {
    return new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
  }

  const calcWeekView = (lastWeekDay) => {
    const weekDates = []
    const arrayOf7num = Array.from({ length: 7 }, (v, i) => i)
    for (let day = 7; day > 0; day--) {
      const leftDay = arrayOf7num[day-1]
      const weekDay = resDays(lastWeekDay, leftDay)
      weekDates.push(weekDay)
    }
    return weekDates
  }

  useEffect(()=> {setWeekView(calcWeekView(selectedDay))}, [selectedDay])

  return (
    <div className="flex h-full flex-col">
      <div ref={container} className="isolate flex flex-auto flex-col">
        <div style={{ width: '165%' }} className="flex max-w-full flex-1 flex-col sm:max-w-none md:max-w-full">
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            <MovilDayColumn weekDates={dateView} />
            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              <DayColumn weekDates={dateView} />
            </div>
          </div>
          <TableEvents weekDates={dateView}/>
        </div>
      </div>
    </div>
  )
}

function DayColumn({weekDates}) {
  const {
    selectedDay
  } = useContextHook()

  const comparedDay = (day) => {
    return selectedDay.getTime() === day.getTime()
  }

  return weekDates.map( wd =>
        <div key={wd} className="flex items-center justify-center py-3">
          <span className="capitalize flex gap-2 items-center">
           { wd.toLocaleDateString('es-ES', { weekday: 'short' })}
           <span className={ comparedDay(wd) ? "flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white" : "items-center justify-center font-semibold text-gray-900"} >{wd.getDate()}</span>
          </span>
        </div>
    )
}

function MovilDayColumn({weekDates}) {
  return (
    <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
      <button type="button" className="flex flex-col items-center pb-3 pt-2">
        M <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">10</span>
      </button>
      <button type="button" className="flex flex-col items-center pb-3 pt-2">
        T <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">11</span>
      </button>
      <button type="button" className="flex flex-col items-center pb-3 pt-2">
        W{' '}
        <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
          12
        </span>
      </button>
      <button type="button" className="flex flex-col items-center pb-3 pt-2">
        T <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">13</span>
      </button>
      <button type="button" className="flex flex-col items-center pb-3 pt-2">
        F <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">14</span>
      </button>
      <button type="button" className="flex flex-col items-center pb-3 pt-2">
        S <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">15</span>
      </button>
      <button type="button" className="flex flex-col items-center pb-3 pt-2">
        S <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">16</span>
      </button>
    </div>
  )
}

function WeekHours({containerOffset}) {

  const hours = Array.from({ length: 24 }, (_, index) => index)

  return (
    <div
      className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
      style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
    >
      <div ref={containerOffset} className="row-end-1 h-7"></div>
      {/* {hours.map((hour, i) =>
            <div key={i}>
              <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              {((hour + 11) % 12 + 1).toString() + ' ' + (hour < 12 ? 'AM' : 'PM')}
              </div>
            </div>
        )
      } */}

      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          12AM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          1AM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          2AM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          3AM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          4AM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          5AM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          6AM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          7AM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          8AM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          9AM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          10AM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          11AM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          12PM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          1PM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          2PM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          3PM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          4PM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          5PM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          6PM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          7PM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          8PM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          9PM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          10PM
        </div>
      </div>
      <div />
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          11PM
        </div>
      </div>
      <div />
    </div>
  )
}

function EventCard({event}) {
  return (
    <li className={`relative w-full overflow-hidden rounded-lg bg-blue-50`}>
      <a
        href={event.url}
        className="group flex flex-col justify-center place-items-center text-xs leading-5"
      >
        <img src={event.cover} alt={event.title} className="w-full h-full object-cover rounded-lg" />
        <p className="text-gray-500 group-hover:text-blue-700">
          <time dateTime={event.releaseDate}>{event.releaseDate}</time>
        </p>
        <p className="order-1 font-semibold text-blue-700 p-2">
          {event.title} - <span className="text-gray-500 group-hover:text-blue-700">{event.chapter}</span>
        </p>
      </a>
    </li>
  )
}

function TableEvents({weekDates}) {
  const { animeList } = useContextHook()
  const daysOfWeek = {}

  const getDayOfWeek = (releaseDate) => {
    const date = new Date(releaseDate);
    return date.getDay();
  }

  weekDates.forEach(date => {
    const dayKey = date.getDay();
    daysOfWeek[dayKey] = [];
  });


  animeList.forEach(event => {
    const dayOfWeek = getDayOfWeek(event.releaseDate);
    const dayName = Object.keys(daysOfWeek)[dayOfWeek];
    daysOfWeek[dayName].push(event);
  });

  return (
    <div className="flex flex-auto h-full pt-2">
      <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
      <div className="flex-auto grid grid-cols-7 gap-2">
        {Object.keys(daysOfWeek).map((day, index) => (
          <div key={index} className="col-span-1 h-full">
            <ol className="space-y-2 flex flex-col h-full">
              {daysOfWeek[day].map((event, i) => (
                <EventCard key={i} event={event} />
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  )
}

function TableEventWithHours({containerOffset}) {
  const { animeList } = useContextHook()
  return (
    <div className="flex flex-auto">
      <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
      <div className="grid flex-auto grid-cols-1 grid-rows-1">
        {/* Horizontal lines */}
        <WeekHours containerOffset={containerOffset} />

        {/* Vertical lines */}
        <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
          <div className="col-start-1 row-span-full" />
          <div className="col-start-2 row-span-full" />
          <div className="col-start-3 row-span-full" />
          <div className="col-start-4 row-span-full" />
          <div className="col-start-5 row-span-full" />
          <div className="col-start-6 row-span-full" />
          <div className="col-start-7 row-span-full" />
          <div className="col-start-8 row-span-full w-8" />
        </div>

        {/* Events */}
        <ol
          className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
          style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
        >
          <li className="relative mt-px flex sm:col-start-3" style={{ gridRow: '74 / span 12' }}>
            <a
              href="#"
              className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
            >
              <p className="order-1 font-semibold text-blue-700">Breakfast</p>
              <p className="text-blue-500 group-hover:text-blue-700">
                <time dateTime="2022-01-12T06:00">6:00 AM</time>
              </p>
            </a>
          </li>
          <li className="relative mt-px flex sm:col-start-3" style={{ gridRow: '92 / span 30' }}>
            <a
              href="#"
              className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
            >
              <p className="order-1 font-semibold text-pink-700">Flight to Paris</p>
              <p className="text-pink-500 group-hover:text-pink-700">
                <time dateTime="2022-01-12T07:30">7:30 AM</time>
              </p>
            </a>
          </li>
          <li className="relative mt-px hidden sm:col-start-6 sm:flex" style={{ gridRow: '122 / span 24' }}>
            <a
              href="#"
              className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
            >
              <p className="order-1 font-semibold text-gray-700">Meeting with design team at Disney</p>
              <p className="text-gray-500 group-hover:text-gray-700">
                <time dateTime="2022-01-15T10:00">10:00 AM</time>
              </p>
            </a>
          </li>
        </ol>
      </div>
    </div>
  )
}
