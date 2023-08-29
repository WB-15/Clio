import { FC, useRef } from 'react'
import { useDateSegment } from 'react-aria'
import {
  DateFieldState,
  DateSegment as StatelyDateSegment,
} from 'react-stately'

interface DateSegmentProps {
  segment: StatelyDateSegment
  state: DateFieldState
}

const DateSegment: FC<DateSegmentProps> = (props) => {
  const { segment, state } = props
  const ref = useRef(null)
  const { segmentProps } = useDateSegment(segment, state, ref)

  return (
    <div
      {...segmentProps}
      ref={ref}
      className="box-content rounded-sm px-0.5 text-center tabular-nums text-neutral-900 outline-none duration-300 ease-in-out focus:bg-primary-500 focus:text-white"
    >
      {segment.text}
    </div>
  )
}

export default DateSegment
