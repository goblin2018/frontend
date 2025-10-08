
import { Conf } from '../../../scripts/conf'

export const UserConf: Conf = {
	name: "user",
	title: "用户",
	abbr: "",
	obj:"User",
	fields: [
		
		{
			name: "phone",
			type: "string",
			cn: "手机号",
			required: true,
			tag: "phone",

		},
		{
			name: "open_id",
			type: "string",
			cn: "微信",
			required: false,
			
		},
		{
			name: "avatar",
			type: "string",
			cn: "头像",
			required: false,
			tag: "img",

		},
		{
			name: "nickname",
			type: "string",
			cn: "昵称",
			required: false,
			
		},
		{
			name: "name",
			type: "string",
			cn: "姓名",
			required: false,
			
		},
		{
			name: "birthday",
			type: "number",
			cn: "生日",
			required: false,
			tag: "date",

		},
		{
			name: "state",
			type: "number",
			cn: "状态",
			required: false,
			tag: "state",

		},
		{
			name: "expire_at",
			type: "number",
			cn: "到期日期",
			required: false,
			tag: "date.expire",

		}
	]
}
