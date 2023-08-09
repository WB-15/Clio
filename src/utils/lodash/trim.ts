const getEscapedCharacter = (char: string) => {
  if (char === ']') return '\\]'
  if (char === '^') return '\\^'
  if (char === '\\') return '\\\\'

  return char
}

export const trim = (string: string, char: string) => {
  const escapedCharacter = getEscapedCharacter(char)

  return string.replace(
    new RegExp(`^[${escapedCharacter}]+|[${escapedCharacter}]+$`, 'g'),
    ''
  )
}
