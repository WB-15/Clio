'use client'

import { ComponentProps, FC, ReactNode, useId } from 'react'
import Select, {
  DropdownIndicatorProps,
  OptionProps,
  components,
} from 'react-select'
import clsx from 'clsx'

import { Icon } from '@/app/components'
import { InputLabel } from '../InputLabel'
import { OptionalErrorMessage } from '../OptionalErrorMessage'

interface WrappedSelectProps extends ComponentProps<typeof Select> {
  labelContent?: ReactNode
  errorMessage?: string
  errors?: any
  selectClassName?: string
}

const DropdownIndicator = (props: DropdownIndicatorProps<any>) => (
  <components.DropdownIndicator {...props}>
    <Icon name="icon-chevron_down" size={20} />
  </components.DropdownIndicator>
)

const Option = (props: OptionProps<any>) => {
  const { data, isSelected } = props

  return isSelected ? (
    <components.Option {...props}>
      <span>{data.label}</span>
      <Icon name="icon-tick" size={24} className="text-primary-500" />
    </components.Option>
  ) : (
    <components.Option {...props} />
  )
}

export const WrappedSelect: FC<WrappedSelectProps> = (props) => {
  const {
    labelContent,
    errorMessage,
    name,
    errors,
    className,
    selectClassName,
    ...rest
  } = props

  const instanceId = `react-select-instance-${useId()}`
  const inputId = `react-select-input-${useId()}`

  const fieldErrorMessage =
    errorMessage || (name ? errors?.[name]?.message : null)

  return (
    <div className={className}>
      <InputLabel htmlFor={inputId}>{labelContent}</InputLabel>
      <Select
        {...rest}
        instanceId={instanceId}
        inputId={inputId}
        components={{ DropdownIndicator, Option }}
        classNames={{
          control: ({ isFocused }) =>
            clsx(
              'rounded-lg border px-2.5 py-2 text-sm text-neutral-900 !duration-300 ease-in-out',
              // eslint-disable-next-line no-nested-ternary
              fieldErrorMessage
                ? 'border-red-600'
                : isFocused
                ? 'border-primary-500'
                : 'border-neutral-200 hover:border-neutral-400',
              selectClassName
            ),
          menu: () =>
            'select-menu p-1 mt-3 mb-3 overflow-hidden rounded-xl bg-white border border-neutral-100 z-100',
          menuList: () => 'select-menu-list z-100',
          option: () =>
            '!flex leading-6 justify-between items-center py-1.5 px-3 hover:bg-neutral-50 rounded-lg duration-150 ease-out border border-white hover:border-neutral-100',
          placeholder: () => 'text-neutral-400',
          indicatorsContainer: ({ selectProps }) =>
            clsx('select-indicators-container duration-150 ease-out', {
              'rotate-x-180': selectProps.menuIsOpen,
            }),
        }}
        unstyled
      />
      <OptionalErrorMessage className="mt-1.5" errorText={fieldErrorMessage} />
    </div>
  )
}
