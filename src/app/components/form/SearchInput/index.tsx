import { ComponentProps, FC } from 'react'
import clsx from 'clsx'

import { Icon } from '../../Icon'
import { ButtonIcon } from '../../ButtonIcon'
import { WrappedInput } from '../WrappedInput'

interface SearchInputProps extends ComponentProps<typeof WrappedInput> {
  inputRef?: any
  onClearValue?: () => void
}

export const SearchInput: FC<SearchInputProps> = (props) => {
  const { onClearValue, value, inputRef, ...rest } = props

  return (
    <WrappedInput
      {...rest}
      ref={inputRef}
      value={value}
      iconSlotLeft={<Icon name="icon-search" size={20} />}
      iconSlotRight={
        <ButtonIcon
          variant="default"
          iconName="icon-close"
          label="Clear search"
          onClick={onClearValue}
          className={clsx('block', {
            'invisible opacity-0': !value,
          })}
        />
      }
    />
  )
}
