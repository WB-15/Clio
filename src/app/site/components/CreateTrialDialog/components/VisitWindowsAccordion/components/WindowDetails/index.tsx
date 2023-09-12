import { FC } from 'react'
import { Control, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { z } from 'zod'

import {
  WrappedInput,
  ControlledCheckbox,
  ControlledSelect,
  ControlledSwitch,
} from '@/app/components/form'
import { Icon, Tooltip } from '@/app/components'
import { trialSchema } from '@/utils/zod'
import { TYPE_OF_VISITS } from '@/constants'

interface WindowDetailsProps {
  control: Control<any>
  register: UseFormRegister<z.input<typeof trialSchema>>
  watch: UseFormWatch<z.input<typeof trialSchema>>
  index: number
  errors: any
}

const WindowDetails: FC<WindowDetailsProps> = (props) => {
  const { index, control, register, watch, errors } = props

  const isVisitWindowSeparate = watch(
    `visit_windows.${index}.separate_visit_window`
  )

  return (
    <div className="grid gap-4">
      <WrappedInput
        placeholder="Enter visit name"
        labelContent="Visit name"
        errorMessage={errors.visit_windows?.[index]?.name?.message}
        {...register(`visit_windows.${index}.name`)}
      />
      <WrappedInput
        placeholder="Enter visit day"
        labelContent="Day"
        errorMessage={errors.visit_windows?.[index]?.visit_day?.message}
        {...register(`visit_windows.${index}.visit_day`)}
      />
      <hr />
      <ControlledSwitch
        name={`visit_windows.${index}.separate_visit_window`}
        control={control}
        labelHeading="Separate before and after windows"
      />
      {isVisitWindowSeparate ? (
        <div className="grid grid-cols-3 items-start gap-3">
          <WrappedInput
            placeholder="Enter window before"
            labelContent="Window before"
            errorMessage={
              errors.visit_windows?.[index]?.window_before_days?.message
            }
            {...register(`visit_windows.${index}.window_before_days`)}
          />
          <WrappedInput
            placeholder="Enter window after"
            labelContent="Window after"
            errorMessage={
              errors.visit_windows?.[index]?.window_after_days?.message
            }
            {...register(`visit_windows.${index}.window_after_days`)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-3 items-start gap-3">
          <WrappedInput
            placeholder="Enter window buffer +/- days"
            labelContent="Window buffer +/- days"
            errorMessage={errors.visit_windows?.[index]?.window_buffer?.message}
            {...register(`visit_windows.${index}.window_buffer`)}
          />
        </div>
      )}
      <hr />
      <ControlledSelect
        name={`visit_windows.${index}.visit_type`}
        control={control}
        labelContent="Type of visit"
        options={TYPE_OF_VISITS}
        placeholder="Select type of visit"
        errorMessage={errors.visit_windows?.[index]?.visit_type?.message}
      />
      <WrappedInput
        placeholder="Enter visit duration (minutes)"
        labelContent="Duration (minutes)"
        iconSlotRight={<Icon name="icon-clock" size={20} />}
        errorMessage={errors.visit_windows?.[index]?.duration_minutes?.message}
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
