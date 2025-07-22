/**
 * 音频工具函数 - 简单的函数调用方式
 */

/**
 * 播放提示音 - 异步版本（等待播放完成）
 * @param src 提示音源地址，默认为分心提示音
 * @param volume 音量大小，默认为1
 * @returns Promise，播放完成时resolve
 */
export function playAlert(
  src: string = 'https://cyue.oss-cn-shenzhen.aliyuncs.com/static/distraction.mp3',
  volume: number = 1
): Promise<void> {
  return new Promise((resolve, reject) => {
    const context = uni.createInnerAudioContext()
    context.src = src
    context.volume = volume

    context.onEnded(() => {
      context.destroy()
      resolve()
    })

    context.onError((error) => {
      context.destroy()
      reject(error)
    })

    context.play()
  })
}

/**
 * 播放提示音 - 同步版本（不等待播放完成）
 * @param src 提示音源地址，默认为分心提示音
 * @param volume 音量大小，默认为1
 */
export function playAlertSync(
  src: string = 'https://cyue.oss-cn-shenzhen.aliyuncs.com/static/distraction.mp3',
  volume: number = 1
): void {
  const context = uni.createInnerAudioContext()
  context.src = src
  context.volume = volume

  // 播放完成后自动销毁
  context.onEnded(() => {
    context.destroy()
  })

  context.onError(() => {
    context.destroy()
  })

  context.play()
}

/**
 * 播放提示音并降低背景音乐音量
 * @param musicContext 背景音乐的音频上下文
 * @param originalVolume 背景音乐的原始音量
 * @param alertSrc 提示音源地址
 * @param alertVolume 提示音音量
 * @returns Promise，播放完成时resolve
 */
export function playAlertWithMusicDuck(
  musicContext: UniApp.InnerAudioContext | null,
  originalVolume: number,
  alertSrc: string = 'https://cyue.oss-cn-shenzhen.aliyuncs.com/static/distraction.mp3',
  alertVolume: number = 1
): Promise<void> {
  return new Promise((resolve, reject) => {
    // 降低背景音乐音量到30%
    if (musicContext) {
      musicContext.volume = originalVolume * 0.3
    }

    const alertContext = uni.createInnerAudioContext()
    alertContext.src = alertSrc
    alertContext.volume = alertVolume

    const cleanup = () => {
      // 恢复背景音乐音量
      if (musicContext) {
        musicContext.volume = originalVolume
      }
      alertContext.destroy()
    }

    alertContext.onEnded(() => {
      cleanup()
      resolve()
    })

    alertContext.onError((error) => {
      cleanup()
      reject(error)
    })

    alertContext.play()
  })
}

/**
 * 播放多个提示音（按顺序播放）
 * @param sounds 提示音配置数组
 */
export async function playAlertSequence(
  sounds: Array<{ src?: string; volume?: number; delay?: number }>
): Promise<void> {
  for (const sound of sounds) {
    if (sound.delay) {
      await new Promise(resolve => setTimeout(resolve, sound.delay))
    }
    await playAlert(sound.src, sound.volume)
  }
}