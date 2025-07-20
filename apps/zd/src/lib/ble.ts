import { useAppStore } from '@/state/app'
import { BleAdapterState, useBleStore } from '@/state/ble'

export function authorizeBle(cb?: () => void): boolean {
  const appStore = useAppStore()
  if (appStore.authBle) {
    return true
  }
  wx.getSetting({
    success: function (res) {
      if (!res.authSetting['scope.bluetooth']) {
        wx.authorize({
          scope: 'scope.bluetooth',
          success: function () {
            appStore.authBle = true
            cb && cb()
          },
          fail: function () {
            wx.showModal({
              title: '提示',
              content: '请授权蓝牙权限以使用相关功能',
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting()
                }
              },
            })
          },
        })
      } else {
        appStore.authBle = true
        cb && cb()
      }
    },
  })
  return false
}

// 初始化蓝牙
export async function initBT({ onSuccess }: { onSuccess?: () => void }) {
  const bleStore = useBleStore()
  uni.openBluetoothAdapter({
    success: function (res) {
      console.log(res)
      switch (res.errno) {
        case 0:
          console.log('初始化蓝牙适配器成功')
          if (bleStore.adapterState < BleAdapterState.Ok) {
            bleStore.adapterState = BleAdapterState.Ok
            onSuccess && onSuccess()
          }
          break
        case -1:
        case 10010:
          console.log('已连接')
          bleStore.adapterState = BleAdapterState.Connected
          break
        case 10001:
          uni.showToast({
            title: '请打开蓝牙',
            icon: 'error',
          })
          bleStore.adapterState = BleAdapterState.InitFailed
          break
      }
    },
    fail: function (res) {
      if (res.errMsg.includes('already opened')) {
        console.log('已打开蓝牙', bleStore.adapterState)
        if (bleStore.adapterState < BleAdapterState.Ok) {
          bleStore.adapterState = BleAdapterState.Ok
          onSuccess && onSuccess()
        }
      } else {
        bleStore.adapterState = BleAdapterState.InitFailed
        uni.showToast({
          title: '蓝牙初始化失败',
          icon: 'error',
        })

        uni.openSetting()
        console.log('初始化蓝牙适配器失败', res)
      }
    },
    complete: function () {
      console.log('complete')
    },
  })
}

export type SensorData = SensorData1 & SensorData2

export function total(s: SensorData) {
  return s.delta + s.theta + s.lowAlpha + s.highAlpha + s.lowBeta + s.highBeta + s.lowGamma + s.highGamma
}

export interface SensorData1 {
  sq: number
  focus: number
  relax: number
  delta: number
  theta: number
  lowAlpha: number
  highAlpha: number
}

export interface SensorData2 {
  lowBeta: number
  highBeta: number
  lowGamma: number
  highGamma: number
}

export function getSensorData(data: ArrayBuffer): SensorData1 | SensorData2 | null {
  const d = new Uint8Array(data)

  if (d.length < 4) {
    console.log('数据长度不足', toPrint(d))
    return null
  }
  let prefix = ''
  for (let i = 0; i < 4; i++) {
    const n = d[i]!
    prefix += ('00' + n.toString(16)).slice(-2)
  }

  switch (prefix) {
    case 'aa01010f':
      if (d.length < 19) {
        console.log('数据1长度不足', d.join(''))
        return null
      }

      if (d[4] !== 0) {
        return null
      }

      return {
        sq: d[4]!,
        focus: d[5]!,
        relax: d[6]!,
        delta: Math.round((get3(d, 7) / 50) * 3),
        theta: Math.round(get3(d, 10) / 3),
        lowAlpha: get3(d, 13),
        highAlpha: get3(d, 16),
      }
    case 'aa01020c':
      if (d.length < 16) {
        console.log('数据2长度不足', d.join(''))
        return null
      }
      return {
        lowBeta: get3(d, 4),
        highBeta: get3(d, 7),
        lowGamma: get3(d, 10),
        highGamma: get3(d, 13),
      }
    default:
      return null
  }
}

const get3 = (d: Uint8Array, idx: number) => {
  return (d[idx]! << 16) + (d[idx + 1]! << 8) + d[idx + 2]!
}
const toPrint = (d: Uint8Array) => {
  let a = ''
  for (let i = 0; i < d.length; i++) {
    a += ('00' + d[i]!.toString(16)).slice(-2)
  }
  return a
}

// normalize 0-100
export function normalize(n: number) {}
export const rate = (v1: number, v2: number) => {
  if (v2 === 0) {
    return 0
  }
  return Math.round((v1 * 100) / v2)
}
