export const formattedNumber = (number: number) => {
  let formattedNumberValue

  if (Number.isInteger(number)) {
    formattedNumberValue = number.toString()
  } else {
    formattedNumberValue = number.toFixed(1)
  }

  return formattedNumberValue
}
