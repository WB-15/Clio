import { trim } from './lodash/trim'

interface BuildUrlOptions {
  leadingSlash?: boolean
  trailingSlash?: boolean
}

export const buildUrl = (args: string[], options: BuildUrlOptions = {}) => {
  const { leadingSlash = true, trailingSlash = false } = options

  const trimmedArgs = args.map((arg) => trim(arg, '/'))

  const nonEmptyArgs = trimmedArgs.filter((arg) => !!arg)

  const joinedPath = nonEmptyArgs.join('/')

  return `${leadingSlash ? '/' : ''}${joinedPath}${trailingSlash ? '/' : ''}`
}
