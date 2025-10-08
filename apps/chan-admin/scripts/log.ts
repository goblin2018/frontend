import colors from 'colors'
import dayjs from 'dayjs'
export const red = (str: string) => colors.red(str)
export const green = (str: string) => colors.green(str)
export const yellow = (str: string) => colors.yellow(str)
export const blue = (str: string) => colors.blue(str)
export const magenta = (str: string) => colors.magenta(str)
export const cyan = (str: string) => colors.cyan(str)

export const log = {
  success: (title: string, info: string) => log.log(title, green('OK'), info),
  error: (title: string, info: string) => log.log(title, red('ERR'), info),
  info: (title: string, info: string) => log.log(title, blue('INFO'), info),
  warn: (title: string, info: string, ...args) =>
    log.log(title, yellow('WARN'), info, ...args),
  log: (title: string, tag: string, info: string, ...args: any[]) => {
    let now = dayjs().format('HH:mm:ss')
    console.log(cyan(now), tag, title, blue(info), ...args)
  },
}
