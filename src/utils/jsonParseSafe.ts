export const jsonParseSafe = (input: any, fallback: any = null) => {
  try {
    return JSON.parse(input || JSON.stringify(fallback))
  } catch {
    return fallback
  }
}
