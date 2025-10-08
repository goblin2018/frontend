import { getToken, setToken } from './token'
import { HttpClient, HttpClinetConfig, SwrFetcherOption } from '@frontend/lib'

export const baseUrl = import.meta.env.VITE_API_URL

export function createUniClient(config: HttpClinetConfig): HttpClient {
  // Add request interceptor to handle common request logic
  uni.addInterceptor('request', {
    invoke(args) {
      // Prepend baseURL to request URL
      if (!args.url.startsWith('http')) {
        args.url = (config.baseURL || '') + args.url
      }

      // Add token to headers
      const token = config.getToken()
      if (token) {
        args.header = {
          ...(args.header || {}),
          Authorization: `Bearer ${token}`,
          'content-type': args.method === 'GET' ? 'application/x-www-form-urlencoded' : 'application/json',
        }
      }
    },
    success(res) {
      console.log('response', res)
      if (res.statusCode === 200) {
        // Handle token in response headers
        if (res.header?.Token && res.header.Token !== '') {
          console.log('storeToken', res.header.Token)
          config.storeToken(res.header.Token)
        }

        // Handle unauthorized
        if (res.data.code === 1003) {
          config.onUnauthorized?.()
        }
      }
    },
    fail(err) {
      console.error('Request failed:', err)
    },
  })

  // Handle response helper
  const handleResponse = <T>(res: any): T => {
    if (res.statusCode === 200) {
      if (res.data.code === 200) {
        config.onSuccess?.()
        return res.data.data
      } else {
        config.onError?.()
        throw new Error(res.data.msg || 'Request failed')
      }
    } else {
      throw new Error(`HTTP Error: ${res.statusCode}`)
    }
  }

  // Create HTTP client implementation
  return {
    get: <T>(url: string, params?: any): Promise<T> => {
      return new Promise((resolve, reject) => {
        uni.request({
          url,
          method: 'GET',
          data: params,
          success: (res: any) => {
            try {
              resolve(handleResponse<T>(res))
            } catch (error) {
              reject(error)
            }
          },
          fail: reject,
        })
      })
    },

    post: <T>(url: string, data?: any): Promise<T> => {
      return new Promise((resolve, reject) => {
        uni.request({
          url,
          method: 'POST',
          data,
          success: (res: any) => {
            try {
              resolve(handleResponse<T>(res))
            } catch (error) {
              reject(error)
            }
          },
          fail: reject,
        })
      })
    },

    delete: <T>(url: string, data?: any): Promise<T> => {
      return new Promise((resolve, reject) => {
        uni.request({
          url,
          method: 'DELETE',
          data,
          success: (res: any) => {
            try {
              resolve(handleResponse<T>(res))
            } catch (error) {
              reject(error)
            }
          },
          fail: reject,
        })
      })
    },

    put: <T>(url: string, data?: any): Promise<T> => {
      return new Promise((resolve, reject) => {
        uni.request({
          url,
          method: 'PUT',
          data,
          success: (res: any) => {
            try {
              resolve(handleResponse<T>(res))
            } catch (error) {
              reject(error)
            }
          },
          fail: reject,
        })
      })
    },
  }
}

// Create HTTP client instance
const httpClient = createUniClient({
  baseURL: baseUrl,
  timeout: 5000,
  getToken: () => getToken(),
  storeToken: (token) => setToken(token),
  clearToken: () => setToken(''),
  onUnauthorized: () => {
    // Handle unauthorized
    console.log('Unauthorized')
  },
})

export interface Response<T = any> {
  code: number
  msg: string
  data: T | null
}

export const getx = <T>(url: string, params = {}, showLoading = true) => {
  if (showLoading) {
    uni.showLoading({ title: '加载中...' })
  }

  return httpClient.get<T>(url, params).finally(() => {
    if (showLoading) {
      uni.hideLoading()
    }
  })
}

export const postx = <T>(url: string, data = {}) => {
  return httpClient.post<T>(url, data)
}

// Export httpClient for direct use
export default httpClient
