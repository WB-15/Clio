import { FC } from 'react'

interface FormHeadingProps {
  heading: string
  description: string
}

const FormHeading: FC<FormHeadingProps> = (props) => {
  const { heading, description } = props

  return (
    <div className="grid gap-1.5 text-center">
      <h1 className="text-lg font-medium">{heading}</h1>
      <p className="text-sm text-neutral-600">{description}</p>
    </div>
  )
}

export default FormHeading
