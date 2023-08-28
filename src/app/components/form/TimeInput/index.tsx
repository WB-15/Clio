import React, {
  useState,
  ComponentPropsWithoutRef,
  forwardRef,
  useRef,
} from 'react'
import { isValidTimeInputValue } from '@/utils'
import { WrappedInput } from '@/app/components/form'
import { Icon } from '@/app/components'

interface TimeInputProps extends ComponentPropsWithoutRef<typeof WrappedInput> {
  initTime?: string
  onTimeChange: (time: string) => void
}

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>((props, ref) => {
  const { initTime, onTimeChange, ...rest } = props
  const [time, setTime] = useState(initTime || '')
  const lastVal = useRef('')

  const onChangeHandler = (val: string) => {
    let newVal = val

    if (newVal === time) {
      return
    }

    if (isValidTimeInputValue(newVal)) {
      if (
        newVal.length === 2 &&
        lastVal.current.length !== 3 &&
        newVal.indexOf(':') === -1
      ) {
        newVal = `${newVal}:`
      }

      if (newVal.length === 2 && lastVal.current.length === 3) {
        newVal = newVal.slice(0, 1)
      }

      if (newVal.length > 5) {
        return
      }

      lastVal.current = newVal

      setTime(newVal)

      if (newVal.length === 5) {
        onTimeChange(newVal)
      }
    }
  }

  return (
    <WrappedInput
      {...rest}
      type="tel"
      value={time}
      onChange={(e) => onChangeHandler(e.target.value)}
      ref={ref}
      iconSlotRight={<Icon name="icon-clock" size={20} />}
    />
  )
})

TimeInput.displayName = 'TimeInput'

export default TimeInput
