import { FC, useState } from 'react'
import { Control, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

import {
  WrappedInput,
  WrappedSwitch,
  ControlledCheckbox,
  ControlledSelect,
} from '@/app/components/form'
import { Icon, Tooltip } from '@/app/components'
import { createTrialSchema } from '@/utils/zod'

interface WindowDetailsProps {
  control: Control<any>
  register: UseFormRegister<z.input<typeof createTrialSchema>>
  index: number
}

const TYPE_OF_VISITS = [
  { label: 'On-site', value: 'on-site' },
  { label: 'Remote', value: 'remote' },
]

const WindowDetails: FC<WindowDetailsProps> = (props) => {
  const { index, control, register } = props
  const [isSeparateWindow, setIsSeparateWindow] = useState(false)

  return (
    <div className="grid gap-4">
      <WrappedInput
        placeholder="Enter visit name"
        labelContent="Visit name"
        {...register(`visit_windows.${index}.name`)}
      />
      <WrappedInput
        placeholder="Enter visit day"
        labelContent="Day"
        {...register(`visit_windows.${index}.visit_day`)}
      />
      <hr />
      <WrappedSwitch
        labelHeading="Separate before and after windows"
        checked={isSeparateWindow}
        onCheckedChange={setIsSeparateWindow}
      />
      {isSeparateWindow ? (
        <div className="grid grid-cols-2 gap-3">
          <WrappedInput
            placeholder="Enter window before"
            labelContent="Window before"
            {...register(`visit_windows.${index}.window_before_days`)}
          />
          <WrappedInput
            placeholder="Enter window after"
            labelContent="Window after"
            {...register(`visit_windows.${index}.window_after_days`)}
          />
        </div>
      ) : (
        <WrappedInput
          placeholder="Enter window buffer +/- days"
          labelContent="Window buffer +/- days"
        />
      )}
      <hr />
      <ControlledSelect
        name={`visit_windows.${index}.visit_type`}
        control={control}
        labelContent="Type of visit"
        options={TYPE_OF_VISITS}
        placeholder="Select type of visit"
      />
      <WrappedInput
        placeholder="Enter visit duration"
        labelContent="Duration"
        iconSlotRight={<Icon name="icon-clock" size={20} />}
        {...register(`visit_windows.${index}.duration_minutes`)}
      />
      <Tooltip tooltipContent="Fasting means refraining from eating for the past x hours.">
        <ControlledCheckbox
          name={`visit_windows.${index}.fasting`}
          control={control}
          label="Fasting visit"
        />
      </Tooltip>
    </div>
  )
}

export default WindowDetails
