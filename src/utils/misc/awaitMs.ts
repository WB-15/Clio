export const awaitMs = (ms: number = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve('ok!'), ms)
  })
