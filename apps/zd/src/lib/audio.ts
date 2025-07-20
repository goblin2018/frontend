const dingUrl = 'https://mindsensor.oss-cn-shenzhen.aliyuncs.com/music/ding.mp3'

let innerAudioContext: UniApp.InnerAudioContext | null = null

function destroyInnerAudioContext() {
  if (innerAudioContext) {
    innerAudioContext.destroy()
    innerAudioContext = null
  }
}

/**
 * 播放走神提示音
 * @param volume 音量，范围0-1，默认0.5。为0时不播放
 */
export function playDistractionAlert(volume: number = 0.5) {
  // 音量为0时不播放
  if (volume <= 0) {
    return
  }

  // 先销毁之前的音频实例
  destroyInnerAudioContext()

  innerAudioContext = uni.createInnerAudioContext()
  uni.setInnerAudioOption
  innerAudioContext.src = dingUrl

  innerAudioContext.volume = Math.max(0, Math.min(1, volume)) // 确保音量在0-1范围内
  innerAudioContext.play()

  setTimeout(() => {
    destroyInnerAudioContext()
  }, 1000)
}

/**
 * 销毁音频实例（用于组件卸载时清理）
 */
export function cleanupAudio() {
  destroyInnerAudioContext()
}
