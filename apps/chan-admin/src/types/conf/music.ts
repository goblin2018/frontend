
import { Conf } from '../../../scripts/conf'

export const MusicConf: Conf = {
	name: "music",
	title: "音乐",
	abbr: "",
	obj:"Music",
	fields: [
		
		{
			name: "course_id",
			type: "number",
			cn: "课程",
			required: true,
			tag: "bigint",
from: "Course.Id"
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
			cn: "图片",
			required: false,
			tag: "img",

		},
		{
			name: "len",
			type: "number",
			cn: "时长",
			required: true,
			tag: "s",

		},
		{
			name: "url",
			type: "string",
			cn: "url",
			required: true,
			tag: "file.audio",

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

		}
	]
}
