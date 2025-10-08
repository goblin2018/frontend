
import { Conf } from '../../../scripts/conf'

export const SystemUserConf: Conf = {
	name: "system_user",
	title: "系统管理员 ",
	abbr: "",
	obj:"SystemUser",
	fields: [
		
		{
			name: "phone",
			type: "string",
			cn: "手机号",
			required: true,
			tag: "phone",

		},
		{
			name: "name",
			type: "string",
			cn: "姓名",
			required: true,
			
		},
		{
			name: "duty",
			type: "string",
			cn: "职务",
			required: false,
			
		},
		{
			name: "state",
			type: "number",
			cn: "状态",
			required: false,
			tag: "state",

		},
		{
			name: "avatar",
			type: "string",
			cn: "头像",
			required: false,
			tag: "img",

		}
	]
}
