import dayjs from 'dayjs'

export const timestampToTimeInfo = (timestamp?: number) => {
  if (!timestamp) {
    return ''
  }

  const date = dayjs(timestamp)
  let info = date.format('HH:mm')
  if (date.hour() < 12) {
    info = '上午 ' + info
  } else {
    info = '下午 ' + date.subtract(12, 'hour').format('HH:mm')
  }

  return info
}

export function formatRange(start_at?: number, end_at?: number) {
  if (!start_at || !end_at) {
    return ''
  }
  let s = dayjs.unix(start_at)
  let e = dayjs.unix(end_at)

  if (s.isSame(e, 'day')) {
    return s.format('YYYY-MM-DD HH:mm') + ' - ' + e.format('HH:mm')
  } else {
    return s.format('YYYY-MM-DD') + ' - ' + e.format('YYYY-MM-DD')
  }
}
