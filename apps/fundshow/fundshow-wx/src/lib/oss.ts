const baseUrl = import.meta.env.VITE_OSS_URL

export function ossUrl(id?: string): string {
  if (id) {
    if (id.startsWith('https')) {
      return id
    }
    return baseUrl + id
  }
  return ''
}

interface Oss {
  accessKeyId: string
  accessKeySecret: string
  stsToken: string
}

const getOss = async (): Promise<Oss> => {
  const data = await getx<Record<'accessKeyId' | 'accessKeySecret' | 'securityToken', string>>('api/user/sts', {})

  return {
    accessKeyId: data.accessKeyId,
    accessKeySecret: data.accessKeySecret,
    stsToken: data.securityToken,
  }
}

import crypto, { MD5 } from 'crypto-js'
import { Base64 } from 'js-base64'
import dayjs from 'dayjs'
import { getx } from './http'

const url = import.meta.env.VITE_OSS_URL

export async function uploadFile(tmpPath: string, ossPath: string, onProgressChange?: (progress: number) => void) {
  // 计算文件md5
  const file = uni.getFileSystemManager()
  const base64 = file.readFileSync(tmpPath, 'base64')
  const name = MD5(base64 as string).toString()
  let oss = await getOss()
  return new Promise<string>((resolve, reject) => {
    const policy = getPolicyText()
    const signature = computeSignature(oss.accessKeySecret, policy)
    const fileName = ossPath + '/' + name // 路径+随机字符串+当前时间戳+文件格式名
    let uploadTask = uni.uploadFile({
      url: url,
      name: 'file',
      filePath: tmpPath, // 待上传的文件路径
      timeout: 10000, // 10s
      formData: {
        key: fileName, // 设置文件上传至OSS后的文件路径
        OSSAccessKeyId: oss.accessKeyId,
        signature,
        policy,
        success_action_status: '200', // 默认上传成功状态码为204，此处被success_action_status设置为200。
        'x-oss-security-token': oss.stsToken, // stsToken
      },
      success: (res) => {
        console.log(res.statusCode)
        // 默认上传成功状态码为204，此处被success_action_status设置为200。
        if (res.statusCode == 200) {
          //   uni.showToast({ title: '上传成功' })
          resolve(fileName)
        } else {
          uploadTask.abort()
          reject(res)
        }
      },
      fail: (err) => {
        console.log('上传失败', err)
        uni.showModal({
          title: '上传失败',
          content: JSON.stringify(err),
        })
        uploadTask.abort()
        reject(err)
      },
    })

    uploadTask.onProgressUpdate((res) => {
      onProgressChange && onProgressChange(res.progress)
    })
  })
}

// 计算签名。
function computeSignature(accessKeySecret, canonicalString) {
  return crypto.enc.Base64.stringify(crypto.HmacSHA1(canonicalString, accessKeySecret))
}

function getPolicyText() {
  const date = dayjs().add(20, 'minute')
  const policy = {
    expiration: date.toISOString(), // 设置policy过期时间。
    conditions: [
      // 限制上传大小。
      ['content-length-range', 0, 1024 * 1024 * 1024],
    ],
  }

  return Base64.encode(JSON.stringify(policy)) // policy必须为base64的string。
}
