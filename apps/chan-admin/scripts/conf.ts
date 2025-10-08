import { CourseConf } from '../src/types/conf/course'
import { MusicConf } from '../src/types/conf/music'
import { SystemUserConf } from '../src/types/conf/system_user'
import { UserConf } from '../src/types/conf/user'

export interface Conf {
  name: string
  title?: string
  abbr?: string
  obj: string
  fields: Field[]
}

export interface Field {
  name: string
  type: string
  cn?: string
  required: boolean
  tag?: '' | 'bigint' | 'img' | 'long' | 'state' | 'date' | 'phone' | 'out' | 'state.on' | 'date.expire' | 'file.audio' | 's' | 'sort' | 'api' | 'color'
  from?: string
}
export const conf: { [key: string]: Conf } = {
  system_user: SystemUserConf,
  user: UserConf,
  music: MusicConf,
  course: CourseConf,
}
