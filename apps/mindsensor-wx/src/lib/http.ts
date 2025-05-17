import { getToken, setToken } from './token'

export const baseUrl = import.meta.env.VITE_API_URL

export const interceptor = () => {
  uni.addInterceptor('request', {
    // 请求拦截器
    invoke(args) {
      // 加载loading

      // 当本地没有token，并且接口地址没在白名单内，一律跳转登录页面
      //   if (!getLocal<string>('token') && !whiteApiList.includes(args.url)) {
      //     toLoginPage()
      //     uni.hideLoading()
      //     return false
      //   }
      // request 触发前拼接 url
      // console.log('请求 ', args.url, "token", getToken())
      args.url = baseUrl + args.url

      //设置请求头及token
      args.header = {
        'content-type': args.method === 'GET' ? 'application/x-www-form-urlencoded' : 'application/json',
        token: getToken(),
      }
    },
    // 响应拦截器，可以对数据进行预处理
    success(args) {
      // console.log('完成', args.data, args.header)
      if (args.statusCode === 200) {
        if (args.header.Token && args.header.Token !== '') {
          console.log('set new token ')
          setToken(args.header.Token)
        }

        // TODO 处理 token 过期 以及 用户会员过期的问题
        if (args.data.code !== 200) {
        }
      }
    },
    fail(err) {
      console.log('失败', err)
    },
  })
}
export interface Response<T = any> {
  code: number
  msg: string
  data: T | null
}

interface Request {
  [key: string]: any
}

interceptor()
export const getx = <T>(url: string, req: Request = {}, showLoading: boolean = true) => {
  if (showLoading) {
    uni.showLoading({
      title: '加载中...',
    })
  }
  return new Promise<T>((resolve, reject) => {
    uni.request({
      url: url,
      method: 'GET',
      data: req,
      success: (res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data.data)
        } else {
          reject(res)
        }
      },

      complete: () => {
        if (showLoading) {
          uni.hideLoading()
        }
      },
    })
  })
}

// post请求
export const postx = <T>(url: string, data: Request = {}) => {
  return new Promise<Response<T>>((resolve, reject) => {
    uni.request({
      url: url,
      method: 'POST',
      data,
      success: (res: any) => {
        if (res.statusCode === 200 && res.data.code === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
    })
  })
}
