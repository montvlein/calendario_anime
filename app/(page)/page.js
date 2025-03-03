'use client'

import { useLatestAnimeList } from '@/app/client/hooks/getLastestAnimeList'
import { useState } from 'react'

export default function Home() {
    const { animeList, loading, error } = useLatestAnimeList()
    const [mostRecentAnime, setMostRecentAnime] = useState(0)

    const resDays = (date, days) => {
      return new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    }

    const calcWeekView = (lastWeekDay) => {
      const weekDates = []
      const arrayOf7num = Array.from({ length: 7 }, (v, i) => i)
      for (let day = 7; day > 0; day--) {
        const leftDay = arrayOf7num[day-1]
        const weekDay = resDays(lastWeekDay, leftDay)
        const animeOfDay = animeList.filter(anime => {
            const animeDate = new Date(anime.releaseDate).toISOString().split('T')[0]
            const weekDayDate = weekDay.toISOString().split('T')[0]
            return animeDate === weekDayDate
        })
        const animeLen = animeOfDay.length
        if (animeLen > mostRecentAnime) { setMostRecentAnime(animeLen) }
        weekDates.push({date: weekDay, day: weekDay.getDay(), anime: animeOfDay})
      }

      return weekDates
    }

    const dateView = calcWeekView(new Date())

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <main className="">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr className='sticky top-0 z-10'>
                        {dateView.map((date, index) => (
                            <th key={index} scope="col" className={`px-6 py-3 capitalize ${index%2 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                <span className="flex gap-2 items-center justify-center">
                                    {date.date.toLocaleDateString('es-ES', { weekday: 'short' })}
                                    <span className={
                                        new Date().getDay() === date.day ?
                                            "flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white" :
                                            "items-center justify-center font-semibold"
                                        } >{date.date.getDate()}</span>
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    { Array.from({ length: mostRecentAnime }, (v, i) => (
                        <tr key={i} className={`border-b border-gray-200 dark:border-gray-700 ${i%2 ? 'opacity-95' : ''}`}>
                            {dateView.map((date, index) => (
                                <td key={index} className={`text-center px-6 py-4 ${index%2 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                    { date.anime[i] && <EventCard key={index} event={date.anime[i]} /> }
                                </td>
                            ))}
                        </tr>
                    ))}

                </tbody>
            </table>
        </main>
    )
}

function EventCard({ event }) {
    return (
        <a
            href={event.url}
            className="group flex flex-col justify-center place-items-center text-xs leading-5 rounded-lg relative"
        >
            <img src={event.cover} alt={event.title} className="w-full object-cover rounded-lg w-[200px] h-[140px] transition-transform duration-300 group-hover:scale-125" />
            <time dateTime={event.releaseDate} className="hidden text-xs">{event.releaseDate}</time>
            <p className="absolute bottom-10 left-1/2 transform -translate-x-1/2 translate-y-full
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200
                        bg-black/80 text-white text-xs px-2 py-1 rounded-md
                        pointer-events-none z-10">
                <span className="font-semibold line-clamp-3">{event.title}</span> <span className="text-gray-300">cap. {event.chapter}</span>
            </p>
        </a>
    )
}
