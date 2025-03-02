import { Fragment } from 'react'

export default function Hours() {

    const hours = Array.from({ length: 24 }, (_, index) => index)

    return hours.map((hour, i) => (
        <Fragment key={i}>
          <div key={`text-${i}`}>
            <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              {((hour + 11) % 12 + 1).toString() + ' ' + (hour < 12 ? 'AM' : 'PM')}
            </div>
          </div>
          <div key={`placeholder-${i}`} />
        </Fragment>
      ))
}