import { ComponentPropsWithoutRef, forwardRef } from 'react'

const paramToArray = (param: number | [number, number]) =>
  typeof param === 'object' ? param : [param, param]

interface IconPropTypes extends ComponentPropsWithoutRef<'svg'> {
  name: string
  size: number | [number, number]
  viewbox?: number | [number, number]
  iconSpritePath?: string
}

export const Icon = forwardRef<SVGSVGElement, IconPropTypes>(
  (
    { name, size, viewbox, iconSpritePath = '/icons/icons.svg', ...rest },
    ref
  ) => {
    const sizes = paramToArray(size)
    const vbox = viewbox ? paramToArray(viewbox) : sizes
    return (
      <svg
        {...rest}
        xmlns="http://www.w3.org/2000/svg"
        width={sizes[0]}
        height={sizes[1]}
        viewBox={`0 0 ${vbox[0]} ${vbox[1]}`}
        ref={ref}
        fill="currentColor"
      >
        <use xlinkHref={`${iconSpritePath}#${name}`} />
      </svg>
    )
  }
)

Icon.displayName = 'Icon'
