
import { Conf } from '../../../scripts/conf'

export const CourseConf: Conf = {
	name: "course",
	title: "课程",
	abbr: "",
	obj:"Course",
	fields: [
		
		{
			name: "group",
			type: "string",
			cn: "分组",
			required: true,
			
		},
		{
			name: "name",
			type: "string",
			cn: "名称",
			required: true,
			
		},
		{
			name: "sort",
			type: "number",
			cn: "排序",
			required: false,
			tag: "sort",

		},
		{
			name: "image",
			type: "string",
			cn: "封面",
			required: false,
			tag: "img",

		},
		{
			name: "color",
			type: "string",
			cn: "主题色",
			required: false,
			tag: "color",

		},
		{
			name: "color2",
			type: "string",
			cn: "深主题色",
			required: false,
			tag: "color",

		},
		{
			name: "desc",
			type: "string",
			cn: "描述",
			required: false,
			tag: "long",

		},
		{
			name: "state",
			type: "number",
			cn: "状态",
			required: false,
			tag: "state",

		},
		{
			name: "musics",
			type: "Music[]",
			cn: "音乐列表",
			required: false,
			tag: "api",

		}
	]
}
