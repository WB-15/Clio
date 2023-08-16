import { FC, useState } from 'react'
import {
  WrappedCheckbox,
  WrappedInput,
  WrappedSwitch,
} from '@/app/components/form'

interface WindowDetailsProps {}

const WindowDetails: FC<WindowDetailsProps> = () => {
  const [isSeparateWindow, setIsSeparateWindow] = useState(false)

  return (
    <div className="grid gap-4">
      <WrappedInput labelContent="Visit name" />
      <WrappedInput labelContent="Day" />
      <hr />
      <WrappedSwitch
        labelHeading="Separate before and after windows"
        checked={isSeparateWindow}
        onCheckedChange={setIsSeparateWindow}
      />
      {isSeparateWindow ? (
        <div className="grid grid-cols-2 gap-3">
          <WrappedInput labelContent="Window before" />
          <WrappedInput labelContent="Window after" />
        </div>
      ) : (
        <WrappedInput labelContent="Window buffer +/- days" />
      )}
      <hr />
      <WrappedInput labelContent="Type of visit" />
      <WrappedInput labelContent="Duration" />
      <WrappedCheckbox label="Fasting visit" />
    </div>
  )
}

export default WindowDetails
