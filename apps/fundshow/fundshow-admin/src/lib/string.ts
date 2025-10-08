export const containsStringArray = (arr1: string[], arr2: string[]) => {
  const str1 = arr1.join('')
  const str2 = arr2.join('')
  return str1.includes(str2)
}
