export const parseError = (response: any) => {
  /* Error from backend */
  const backendError = response?.error

  /* Error from zod */
  const zodError = Array.isArray(response)
    ? response[0]?.errors?.issues?.[0]?.message
    : null

  return backendError || zodError || null
}
