export const parseError = (response: any, fallbackError?: string) => {
  /* Error from backend */
  const backendError = response?.error

  /* Error from zod */
  const zodError = Array.isArray(response)
    ? response[0]?.errors?.issues?.[0]?.message
    : null

  const zodPath = Array.isArray(response)
    ? response[0]?.errors?.issues?.[0]?.path?.[0] || ''
    : ''

  const zodFullError = `${zodError} ${zodPath}`

  return backendError || zodFullError || fallbackError
}
