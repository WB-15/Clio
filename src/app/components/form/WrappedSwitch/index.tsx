import { ComponentProps, FC, ReactNode, useId } from 'react'
import * as Switch from '@radix-ui/react-switch'

interface WrappedSwitchProps extends ComponentProps<typeof Switch.Root> {
  labelHeading?: ReactNode
}

export const WrappedSwitch: FC<WrappedSwitchProps> = (props) => {
  const { id: idProp, labelHeading, ...rest } = props

  const fallbackId = useId()
  const id = idProp || `switch-${fallbackId}`

  const labelId = `switch-label-${id}`

  return (
    <div className="flex">
      <Switch.Root
        {...rest}
        className="group h-5 w-9.5 shrink-0 rounded-full bg-neutral-300 p-0.5 duration-300 ease-out disabled:opacity-50 data-checked:bg-primary-500"
        id={id}
        aria-labelledby={labelId}
      >
        <Switch.SwitchThumb className="block h-4 w-4 rounded-full bg-white duration-300 ease-out group-data-checked:translate-x-[18px]" />
      </Switch.Root>
      <label id={labelId} htmlFor={id} className="pl-3 text-sm font-medium">
        {labelHeading}
      </label>
    </div>
  )
}
