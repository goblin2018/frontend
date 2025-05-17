import type { Music } from './music'

export interface Group {
  id: string
  group: string // 课程分组
  name: string // 课程名称
  desc: string // 课程描述
  image: string // 课程封面
  items: Music[] // 课程音乐列表
}
