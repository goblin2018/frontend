<script lang="ts" setup>
import Popup from '@/components/popup.vue'
import { BleAdapterState, enableDada, useBleStore } from '@/state/ble'
import { getSensorData, type SensorData1, initBT, authorizeBle } from '@/lib/ble'
import buttonx from '@/components/buttonx.vue'
import { useTrainStore } from '@/state/train'
import { useUserStore } from '@/state/user'
import { useSettingsStore } from '@/state/settings'
import Empty from '@/components/business/empty.vue'

const dingUrl = 'https://mindsensor.oss-cn-shenzhen.aliyuncs.com/music/ding.mp3'

const popupOpen = ref(false)
const close = () => {
  // 如果正在搜索 则取消搜索
  stopSearch()
  popupOpen.value = false
}

const emit = defineEmits(['onNotLogin'])

const settingsStore = useSettingsStore()

var innerAudioContext: UniApp.InnerAudioContext

function destroyInnerAudioContext() {
  if (innerAudioContext) {
    innerAudioContext.destroy()
  }
}

const userStore = useUserStore()

// 处理ble连接事件
const deviceList = ref<UniApp.BluetoothDeviceInfo[]>([])
const bleStore = useBleStore()

// 开发连接其他设备逻辑
const connectOther = () => {
  clearCheckInterval()

  bleStore.adapterState = BleAdapterState.Ok
  uni.closeBLEConnection({
    deviceId: bleStore.device!.deviceId,
    complete: () => {
      search()
    },
  })
}

const searching = ref(false)

const stopSearch = () => {
  uni.getBluetoothAdapterState({
    success: (res) => {
      console.log('getBluetoothAdapterState success', res)
      if (res.discovering) {
        console.log('stopBluetoothDevicesDiscovery')
        uni.stopBluetoothDevicesDiscovery({
          success: (res) => {
            console.log('stopBluetoothDevicesDiscovery success', res)
          },
          fail: (err) => {
            console.log('stopBluetoothDevicesDiscovery fail', err)
          },
          complete: () => {
            console.log('stopBluetoothDevicesDiscovery complete')
            searching.value = false
          },
        })
      }
    },
    fail: (err) => {
      console.log('getBluetoothAdapterState fail', err)
    },
    complete: () => {
      console.log('getBluetoothAdapterState complete')
      searching.value = false
    },
  })
}

const checkInterval = ref<number | undefined>(undefined)

function clearCheckInterval() {
  console.log('clearCheckInterval', checkInterval.value)
  if (checkInterval.value) {
    clearInterval(checkInterval.value)
    checkInterval.value = undefined
  }
}

const search = () => {
  console.log('start search')

  deviceList.value = []
  searching.value = true
  uni.startBluetoothDevicesDiscovery({
    success: (res) => {
      console.log('开始搜索成功', res)
      setTimeout(() => {
        stopSearch()
      }, 10000)
      uni.onBluetoothDeviceFound((res) => {
        if (res.devices && res.devices.length > 0) {
          let first = res.devices[0]
          if (!first) {
            return
          }
          let name = first.name
          if (!name || !name.startsWith('Mindsensor_')) {
            return
          }
          //
          let hasDevice = false
          deviceList.value.forEach((device) => {
            if (device.name === first!.name) {
              hasDevice = true
              return
            }
          })
          if (!hasDevice) {
            deviceList.value.push(first)
          }
        }
      })
    },
    fail: (err) => {
      console.log('startBluetoothDevicesDiscovery fail', err)
      stopSearch()
    },
    complete: () => {},
  })
}

const trainStore = useTrainStore()
const wearState = ref(-1)

function onNotWearOk() {
  // 仅提示第一次
  if (!bleStore.wearOk) {
    return
  }

  uni.showToast({
    title: '请正确佩戴设备',
    icon: 'none',
  })

  bleStore.wearOk = false
  bleStore.focus = 0
  bleStore.relax = 0
  trainStore.onWearOk(false)
}

const listen = () => {
  clearCheckInterval()
  // 监听数据
  uni.notifyBLECharacteristicValueChange({
    deviceId: bleStore.device!.deviceId!,
    serviceId: bleStore.serviceId,
    characteristicId: bleStore.dataCharacteristicId,
    state: true,
    success: (res) => {
      console.log('notifyBLECharacteristicValueChange success', res)

      let isHalf = false
      let part1: SensorData1 | null = null

      checkInterval.value = setInterval(() => {
        // 每3秒检查一次是否佩戴正常 如果 有数值 则佩戴正常 否则 佩戴不正常 但是每秒仅能设置一次
        if (wearState.value === -1) {
          onNotWearOk()
        }
        wearState.value = -1

        // console.log('rate now ***********', dayjs().format('HH:mm:ss'), '*******************')
      }, 3000)

      console.log('checkInterval.value after', checkInterval.value)

      uni.onBLECharacteristicValueChange((res) => {
        let data = getSensorData(res.value as any)
        if (data) {
          if ('sq' in data) {
            // 如果sq为0 则 佩戴正常 否则 佩戴不正常
            if (data.sq === 0) {
              part1 = data
              isHalf = true
              bleStore.wearOk = true
              bleStore.focus = part1.focus
              bleStore.relax = part1.relax
              trainStore.onWearOk(true)
              wearState.value = 0
            } else {
              console.log('佩戴不正常')
              onNotWearOk()
              wearState.value = -1
            }
          } else {
            // data2
            if (isHalf) {
              let all = {
                ...part1!,
                ...data,
              }

              trainStore.onSensorData(all)
            }

            isHalf = false
            // 打印平均值以及 比例 以及 总和
          }
        } else {
          // 有其他数据
          // onNotWearOk()
        }
      })
    },
    fail: (err) => {
      console.log('notifyBLECharacteristicValueChange fail', err)
    },
  })
}

const enable = () => {
  uni.writeBLECharacteristicValue({
    deviceId: bleStore.device!.deviceId!,
    serviceId: bleStore.serviceId,
    characteristicId: bleStore.commandCharacteristicId,
    value: enableDada.buffer as any,
    success: (res) => {
      console.log('writeBLECharacteristicValue success', res)
    },
    fail: (err) => {
      console.log('writeBLECharacteristicValue fail', err)
    },
  })
}

const getDevices = () => {
  uni.getBluetoothDevices({
    success: (res) => {
      console.log('getBluetoothDevices success', res)
    },
    fail: (err) => {
      console.log('getBluetoothDevices fail', err)
    },
  })
}

const connect = (item: UniApp.BluetoothDeviceInfo) => {
  console.log('connect', item)
  bleStore.adapterState = BleAdapterState.Connecting
  uni.createBLEConnection({
    deviceId: item.deviceId,
    timeout: 10000,
    success(res) {
      console.log('createBLEConnection success', res)
      bleStore.adapterState = BleAdapterState.Connected
      bleStore.setDevice(item)

      // 监听蓝牙连接状态
      uni.onBLEConnectionStateChange((res) => {
        console.log('onBLEConnectionStateChange', res)
        if (res.deviceId === bleStore.device?.deviceId && !res.connected) {
          bleStore.adapterState = BleAdapterState.Ok
        }
      })

      uni.getBLEDeviceServices({
        deviceId: item.deviceId,
        success: (res) => {
          console.log('getBLEDeviceServices success', res)
          // 获取服务列表
          uni.getBLEDeviceCharacteristics({
            deviceId: item.deviceId,
            serviceId: bleStore.serviceId,
            success(res) {
              console.log('getBLEDeviceCharacteristics success', res)

              // 启动
              enable()

              // listen
              listen()
            },

            fail(err) {
              console.log('getBLEDeviceCharacteristics fail', err)
            },
          })
        },
        fail: (err) => {
          console.log('getBLEDeviceServices fail', err)
        },
      })
    },
    fail(err) {
      console.log('createBLEConnection fail', err)
      bleStore.adapterState = BleAdapterState.Ok
    },
    complete() {
      // 连接成功之后，停止搜索
      stopSearch()
    },
  })
}

const state_src = ref('')

watch(
  () => [bleStore.adapterState, bleStore.wearOk],
  (val) => {
    if (bleStore.adapterState === BleAdapterState.InitFailed) {
      state_src.value = '/static/svg/error.svg'
      return
    }

    if (bleStore.adapterState === BleAdapterState.NotInit || bleStore.adapterState === BleAdapterState.Ok) {
      state_src.value = '/static/svg/ble.svg'
      return
    }

    if (bleStore.wearOk) {
      state_src.value = '/static/svg/ok.svg'
    } else {
      state_src.value = '/static/svg/warn.svg'
    }
  },
  { immediate: true },
)

function openPopup() {
  // 检查用户是否登录，如果未登录，则直接返回
  if (!userStore.isLogin) {
    emit('onNotLogin')
    return
  }

  // 检查蓝牙权限是否打开
  if (authorizeBle(openPopup)) {
    popupOpen.value = true
  }
}
function closePopup() {
  popupOpen.value = false
}

onUnmounted(() => {
  clearCheckInterval()
  stopSearch()
  destroyInnerAudioContext()
})

watch(
  () => trainStore.is_distracted,
  (val) => {
    if (val) {
      if (settingsStore.use_distraction) {
        innerAudioContext = uni.createInnerAudioContext()
        innerAudioContext.src = dingUrl
        innerAudioContext.volume = 0.5
        innerAudioContext.play()

        setTimeout(() => {
          destroyInnerAudioContext()
        }, 1000)
      }

      setTimeout(() => {
        trainStore.is_distracted = false
      }, 1000)
    }
  },
)

watch(
  () => popupOpen.value,
  (val) => {
    if (val) {
      switch (bleStore.adapterState) {
        case BleAdapterState.InitFailed:
        case BleAdapterState.NotInit:
          initBT({ onSuccess: search })
          break
        case BleAdapterState.Ok:
          search()
          break
        default:
          break
      }
    } else {
      stopSearch()
    }
  },
)

watch(
  () => bleStore.adapterState,
  (val) => {
    console.log('adapterState', val)
  },
  { immediate: true },
)
</script>

<template>
  <view>
    <buttonx size="48" @click="openPopup" class-name="bg-transparent" :class="['ble-button']">
      <view class="p1 box-border w-64 h-48 relative ble">
        <img src="/static/images/mindsensor.png" :class="'object-contain w-full h-full'" />
        <img class="absolute right-4 bottom-4 w12 h12 object-contain" :src="state_src" />
      </view>
    </buttonx>
  </view>
  <Popup :open="popupOpen" @close="close">
    <view class="flex flex-col max-h-80vh rounded-t-xl px-2 bg-#f7f7f7">
      <view v-if="bleStore.adapterState == BleAdapterState.InitFailed" class="h-120 center flex-col space-y-1 p-1">
        <view class="font-bold text-black/85">蓝牙初始化失败</view>
        <view class="text-black/30">请打开系统蓝牙设置</view>
      </view>

      <view v-else-if="bleStore.adapterState == BleAdapterState.NotInit">
        <view class="h-120 center flex-col space-y-1 p-1">
          <view class="font-bold text-black/85">蓝牙未初始化</view>
          <buttonx class="w-full mt-2" class-name="bg-slate-200 text-slate-950" @click="() => initBT({ onSuccess: search })">初始化</buttonx>
        </view>
      </view>

      <view v-else-if="bleStore.adapterState == BleAdapterState.Ok || bleStore.adapterState == BleAdapterState.Connecting">
        <!-- <view v-if="false"> -->

        <view class="p2">
          <view class="center text-14px text-black/65 mb-4">可连接设备列表</view>
          <Empty v-if="deviceList.length == 0" subtitle="无可连接设备" />

          <scroll-view v-else scroll-y class="h-300">
            <view class="px-1 mb-1" v-for="item in deviceList" :key="item.deviceId">
              <view class="flex items-center justify-between box-border p-1 border-b border-b-solid border-b-slate-300 h-56" @click="() => connect(item)">
                <view class="center">
                  <image mode="aspectFit" src="/static/images/mindsensor.png" class="w-40 h-30 mr-1" />
                  <text class="text-slate-950">{{ item.name }}</text>
                </view>
                <buttonx :hide-text-when-loading="true" :loading="bleStore.adapterState == BleAdapterState.Connecting" size="40" type="link">连接</buttonx>
              </view>
            </view>
          </scroll-view>
        </view>

        <buttonx :loading="searching" size="56" class-name=" bg-slate-200 text-slate-950" @click="search">搜索</buttonx>
      </view>

      <!-- 设备已连接成功 连接其他设备 -->
      <view v-else class="">
        <view class="p-2 pt-4 bg-white">
          <view class="flex border-solid border-base p1 rounded-lg">
            <view class="w-102 h-68 rounded relative mr-1">
              <image src="/static/images/mindsensor.png" mode="aspectFit" :class="'w-full h-full'" />
              <view class="absolute right-1 bottom-1">
                <image class="w24 h24 object-contain" mode="aspectFit" :src="bleStore.wearOk ? '/static/svg/ok.svg' : '/static/svg/warn.svg'" />
              </view>
            </view>
            <view>
              <view class="text-slate-950 font-bold mb-1">{{ bleStore.device?.name }}</view>
              <view v-if="bleStore.wearOk == true">佩戴正常</view>
              <view v-else class="text-amber">佩戴异常</view>
            </view>
          </view>
        </view>
        <buttonx class-name="bg-slate-200 text-slate-950" @click="connectOther">连接其他设备</buttonx>
      </view>
      <view class="h-8"></view>
      <buttonx type="text" size="56" @click="close" class="bg-transparent">取消</buttonx>
      <view class="h-8"></view>
    </view>
  </Popup>
</template>

<style scoped>
.ble-button {
  width: 128rpx;
  height: 96rpx;
  display: block;
  border-radius: 8px;
  border: 1px solid rgba(226, 232, 240, 0.65);
}

.ble {
}
</style>
