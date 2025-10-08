export const trimPrefix = (str: string, prefix: string): string => {
  if (str.startsWith(prefix)) {
    return str.substring(prefix.length)
  }
  return str
}

export function lowerFirstLetter(str: string): string {
  if (str.length === 0) {
    return str
  }
  const firstChar = str.charAt(0).toLowerCase()
  const restOfString = str.substring(1)

  return firstChar + restOfString
}

export function trimSuffix(str: string, suffix: string): string {
  str = str.trim()
  if (str.endsWith(suffix)) {
    return str.substring(0, str.length - suffix.length)
  }
  return str
}
