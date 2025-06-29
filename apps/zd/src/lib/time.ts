import dayjs from 'dayjs'

export const formatLen = (time?: number, useChinese = false, useShort = false): string => {
  if (!time) {
    if (useChinese) {
      return '0秒'
    }
    return '00:00'
  }

  const hour = Math.floor(time / 3600)
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time - minutes * 60)

  const strs: string[] = []
  if (hour > 0) {
    strs.push(hour.toString())
  }

  if (useShort) {
    if (hour > 0 || minutes > 0) {
      strs.push(minutes.toString())
    }
  } else {
    strs.push(minutes < 10 ? '0' + minutes : minutes.toString())
  }

  if (useShort) {
    strs.push(seconds.toString())
  } else {
    strs.push(seconds < 10 ? '0' + seconds : seconds.toString())
  }

  if (useChinese) {
    if (strs.length == 1) {
      return `${strs[0]}秒`
    }
    if (strs.length == 2) {
      return `${strs[0]}分${strs[1]}秒`
    }
    return `${strs[0]}时${strs[1]}分${strs[2]}秒`
  }
  return strs.join(':')
}

/**
 * Converts a Unix timestamp to a formatted date string.
 *
 * @param {number} timestamp - The Unix timestamp to convert.
 * @return {string} The formatted date string in the format 'YYYY-MM-DD'.
 */
export function toDate(timestamp?: number): string {
  if (!timestamp) {
    return ''
  }

  return dayjs.unix(timestamp).format('YYYY-MM-DD')
}

export function formatRange(start_at?: number, end_at?: number) {
  if (!start_at || !end_at) {
    return ''
  }
  const s = dayjs.unix(start_at)
  const e = dayjs.unix(end_at)

  if (s.isSame(e, 'day')) {
    return s.format('YYYY/MM/DD HH:mm') + ' - ' + e.format('HH:mm')
  } else {
    return s.format('YYYY/MM/DD') + '-' + e.format('YYYY/MM/DD')
  }
}
