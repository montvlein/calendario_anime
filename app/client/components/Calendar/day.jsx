'use client'
import { useEffect, useRef, Fragment } from 'react'
import { useContextHook } from '../../context/contextHook'
import Hours from './hours'

export default function DayCalendar() {

  const {
    selectedDay
  } = useContextHook()

  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)
  const hours = Array.from({ length: 24 }, (_, index) => index)

  const scrollToCurrentMinute = () => {
    const currentMinute = new Date().getHours() * 60
    const scrollPoint =
    ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
    currentMinute) /
    1440
    return scrollPoint
  }

  useEffect(() => {
    const scrollPoint = scrollToCurrentMinute()
    container.current.scrollTo({
      top: scrollPoint,
      behavior: 'smooth'
    });
  }, [])

  return (
    <div ref={container} className="flex flex-auto flex-col overflow-auto">
      <div
        ref={containerNav}
        className="sticky top-0 z-10 p-4 grid flex-none grid-cols-7 bg-gray-50 text-center text-gray-500 shadow ring-1 ring-black ring-opacity-5 hidden"
      >
        <span className="capitalize flex gap-2 items-center">
          { selectedDay.toLocaleDateString('es-ES', { weekday: 'long' })}
          <span className="items-center justify-center font-semibold text-gray-900">{selectedDay.getDate()}</span>
        </span>
      </div>
      <div className="flex w-full flex-auto">
        <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
        <div className="grid flex-auto grid-cols-1 grid-rows-1">
          {/* Horizontal lines */}
          <div
            className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
            style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
          >
            <div ref={containerOffset} className="row-end-1 h-7"></div>
            <Hours />
          </div>
          <DayEvents />
        </div>
      </div>
    </div>
  )
}

function DayEvents() {
  return (
    <ol
      className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
      style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
    >
      <li className="relative mt-px flex" style={{ gridRow: '74 / span 12' }}>
        <a
          href="#"
          className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
        >
          <p className="order-1 font-semibold text-blue-700">Breakfast</p>
          <p className="text-blue-500 group-hover:text-blue-700">
            <time dateTime="2022-01-22T06:00">6:00 AM</time>
          </p>
        </a>
      </li>
      <li className="relative mt-px flex" style={{ gridRow: '92 / span 30' }}>
        <a
          href="#"
          className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
        >
          <p className="order-1 font-semibold text-pink-700">Flight to Paris</p>
          <p className="order-1 text-pink-500 group-hover:text-pink-700">
            John F. Kennedy International Airport
          </p>
          <p className="text-pink-500 group-hover:text-pink-700">
            <time dateTime="2022-01-22T07:30">7:30 AM</time>
          </p>
        </a>
      </li>
      <li className="relative mt-px flex" style={{ gridRow: '134 / span 18' }}>
        <a
          href="#"
          className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-indigo-50 p-2 text-xs leading-5 hover:bg-indigo-100"
        >
          <p className="order-1 font-semibold text-indigo-700">Sightseeing</p>
          <p className="order-1 text-indigo-500 group-hover:text-indigo-700">Eiffel Tower</p>
          <p className="text-indigo-500 group-hover:text-indigo-700">
            <time dateTime="2022-01-22T11:00">11:00 AM</time>
          </p>
        </a>
      </li>
    </ol>)
}
