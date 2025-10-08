import fs from 'fs'
import { log } from './log'
import path from 'path'

export const createDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
    log.success('创建目录', dir)
  } else {
    log.warn('创建目录', dir, '已存在')
  }
}

export const withDir = (dir: string, filename: string) => {
  return path.join(dir, filename)
}

export const withExt = (filename: string, ext: string) => {
  return filename + '.' + ext
}
