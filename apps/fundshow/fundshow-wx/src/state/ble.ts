import { defineStore } from 'pinia'

interface BleState {
  adapterState: BleAdapterState
  device?: UniApp.BluetoothDeviceInfo
  serviceId: string
  commandCharacteristicId: string
  dataCharacteristicId: string
  wearOk: boolean
  relax: number
  focus: number
}
// 连接状态
// ok 已连接
// not_init 未初始化
// no_connection 未连接
// connecting 连接中
// init_failed 初始化失败 需要打开系统蓝牙设置

// 未初始化 已初始化 初始化失败（打开蓝牙失败）
export enum BleAdapterState {
  NotInit,
  InitFailed,
  Ok,
  Connecting,
  Connected,
}

export const enableDada = new Uint8Array([77, 71, 1])

export const disableData = new Uint8Array([77, 71, 0])

export const useBleStore = defineStore({
  id: 'ble',
  state: (): BleState => ({
    adapterState: BleAdapterState.NotInit,
    // 默认的服务id
    serviceId: '039AFFF0-2C94-11E3-9E06-0002A5D5C51B',
    // 默认的命令特征值id
    commandCharacteristicId: '039AFFA0-2C94-11E3-9E06-0002A5D5C51B',
    // 默认的数据特征值id
    dataCharacteristicId: '039AFFF4-2C94-11E3-9E06-0002A5D5C51B',
    wearOk: false,
    relax: 0,
    focus: 0,
  }),
  getters: {},
  actions: {
    setDevice(d: UniApp.BluetoothDeviceInfo) {
      this.device = d
    },

    onWearOk(ok: boolean) {
      this.wearOk = ok
    },
  },
})

export function ab2hex(buffer: any) {
  const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return hexArr.join('')
}
