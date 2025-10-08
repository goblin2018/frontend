import OSS from 'ali-oss'

import { get2 } from './axios'

const getToken = async () => {
  const data = await get2({ url: '/api/system_user/sts' })

  return {
    accessKeyId: data.accessKeyId,
    accessKeySecret: data.accessKeySecret,
    stsToken: data.securityToken,
  }
}

const getOss = async () => {
  let res = await getToken()
  return new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: res.accessKeyId,
    accessKeySecret: res.accessKeySecret,
    bucket: 'cyue',
    stsToken: res.stsToken,
    secure: true,
    refreshSTSToken: getToken,
  })
}

const base = import.meta.env.VITE_OSS_URL

export function ossUrl(url?: string) {
  if (!url) return ''
  return `${base}${url}`
}

export default getOss
