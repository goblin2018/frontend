import { pinyin } from 'pinyin-pro'

export function pinyinSearch(input, option) {
  let label = option?.label as string
  const pinyinStr = pinyin(label, { pattern: 'initial' })
  return label.includes(input) || pinyinStr.includes(input)
}
