/**
 * 简化的音频管理器
 * 直接使用 innerAudioContext，避免过度封装
 */

export class AudioManager {
  private musicContext: UniApp.InnerAudioContext | null = null
  private originalMusicVolume: number = 1
  private autoplay: boolean = false
  private loop: boolean = false
  private wasPlayingBeforeInterruption: boolean = false

  // 事件回调
  onTimeUpdate?: (time: number) => void
  onEnded?: () => void
  onPlay?: () => void
  onPause?: () => void
  onCanplay?: () => void
  onError?: (error: any) => void
  onInterruptionBegin?: () => void
  onInterruptionEnd?: () => void

  constructor(autoplay: boolean = false, loop: boolean = false) {
    this.autoplay = autoplay
    this.loop = loop

    // 监听音频中断事件
    this.setupInterruptionListeners()
  }

  /**
   * 设置音频中断监听
   * 系统中断（如来电、闹钟等）会自动暂停音频，但不会自动恢复
   */
  private setupInterruptionListeners(): void {
    // 音频中断开始事件
    uni.onAudioInterruptionBegin(() => {
      // 记录中断前的播放状态
      this.wasPlayingBeforeInterruption = this.isPlaying()

      // 系统已自动暂停，这里主要是更新状态
      // 不需要手动调用 pauseMusic()，因为系统已经暂停了

      // 触发中断开始回调
      this.onInterruptionBegin?.()

      console.log('音频播放被系统中断')
    })

    // 音频中断结束事件
    uni.onAudioInterruptionEnd(() => {
      // 如果中断前正在播放，则恢复播放
      if (this.wasPlayingBeforeInterruption && this.musicContext) {
        this.musicContext.play()
        console.log('系统中断结束，恢复音频播放')
      }

      // 触发中断结束回调
      this.onInterruptionEnd?.()
    })
  }

  /**
   * 初始化音乐（不自动播放）
   * @param src 音频源地址
   * @param forceReInit 是否强制重新初始化（默认为false）
   * @returns 是否进行了初始化操作
   */
  initMusic(src: string): boolean {
    // 如果当前已有音频上下文且是同一个音频源，且不需要强制重新初始化
    if (this.musicContext && this.musicContext.src === src) {
      // 已经初始化过相同的音频源，无需重新初始化
      return false
    }

    // 停止当前音乐
    if (this.musicContext) {
      this.musicContext.destroy()
    }

    // 创建新的音频上下文
    this.musicContext = uni.createInnerAudioContext()
    this.musicContext.src = src
    this.musicContext.volume = this.originalMusicVolume
    this.musicContext.autoplay = this.autoplay
    this.musicContext.loop = this.loop

    // 设置事件监听
    this.musicContext.onTimeUpdate(() => {
      this.onTimeUpdate?.(this.musicContext!.currentTime)
    })

    this.musicContext.onEnded(() => {
      this.onEnded?.()
    })

    this.musicContext.onPlay(() => {
      this.onPlay?.()
    })

    this.musicContext.onPause(() => {
      this.onPause?.()
    })

    this.musicContext.onCanplay(() => {
      this.onCanplay?.()
    })

    this.musicContext.onError((error) => {
      this.onError?.(error)
    })

    return true
  }

  /**
   * 播放当前已初始化的音乐
   * 如果没有初始化过音乐，则不执行任何操作
   */
  play(): void {
    this.musicContext?.play()
  }
  
  /**
   * 播放音乐
   * @param src 音频源地址
   */
  playMusic(src: string): void {
    this.initMusic(src)
    this.play()
  }

  setSrc(src: string): void {
    if (this.musicContext) {
      this.musicContext.src = src
    }
  }

  /**
   * 暂停音乐
   */
  pauseMusic(): void {
    this.musicContext?.pause()
  }

  /**
   * 停止音乐
   */
  stopMusic(): void {
    this.musicContext?.stop()
  }

  /**
   * 跳转到指定位置
   */
  seekMusic(position: number): void {
    this.musicContext?.seek(position)
  }

  setLoop(loop: boolean): void {
    this.loop = loop
    if (this.musicContext) {
      this.musicContext.loop = loop
    }
  }



  /**
   * 播放提示音（简化版本）
   * @param volume 音量大小，默认为1
   */
  playAlert(volume: number = 1): void {
    const context = uni.createInnerAudioContext()
    context.src = 'https://mindsensor.oss-cn-shenzhen.aliyuncs.com/music/ding.mp3'
    context.volume = volume




    if (this.musicContext) {
      this.musicContext.volume = 0.3
    }

    // 播放完成后自动销毁
    context.onEnded(() => {
      if (this.musicContext) {
        this.musicContext.volume = this.originalMusicVolume
      }
      context.destroy()
    })

    context.onError(() => {
      if (this.musicContext) {
        this.musicContext.volume = this.originalMusicVolume
      }
      context.destroy()
    })

    context.play()
  }

  /**
   * 获取当前播放时间
   */
  getCurrentTime(): number {
    return this.musicContext?.currentTime || 0
  }

  /**
   * 获取音频总时长
   */
  getDuration(): number {
    return this.musicContext?.duration || 0
  }

  /**
   * 是否正在播放
   */
  isPlaying(): boolean {
    return this.musicContext ? !this.musicContext.paused : false
  }

  /**
   * 手动处理音频中断开始
   * 可以在需要时手动调用，例如在应用切入后台时
   */
  handleInterruptionBegin(): void {
    this.wasPlayingBeforeInterruption = this.isPlaying()
    // 不需要手动暂停，因为系统会自动暂停
    this.onInterruptionBegin?.()
  }

  /**
   * 手动处理音频中断结束
   * 可以在需要时手动调用，例如在应用切回前台时
   */
  handleInterruptionEnd(): void {
    if (this.wasPlayingBeforeInterruption && this.musicContext) {
      this.musicContext.play()
    }
    this.onInterruptionEnd?.()
  }

  /**
   * 销毁所有音频资源
   */
  destroy(): void {
    // 移除中断监听
    uni.offAudioInterruptionBegin()
    uni.offAudioInterruptionEnd()


    console.log("destroy", this.musicContext)
  
    // 先停止音频，再销毁
    if (this.musicContext) {
      try {
        console.log("stop context")
        this.musicContext.stop()
      } catch (error) {
        console.warn('停止音频时出错:', error)
      }
      this.musicContext.destroy()
      this.musicContext = null
    }
  }
}

// 全局单例
let audioManager: AudioManager | null = null

export function getAudioManager(): AudioManager {
  if (!audioManager) {
    console.log("get new audio manager xxxxxxxxxxx")
    audioManager = new AudioManager()
  }
  return audioManager
}



/**
 * 简单的播放提示音函数
 * @param volume 音量大小，默认为1
 */
export function playAlert(volume: number = 1): void {
  const audioManager = getAudioManager()
  audioManager.playAlert(volume)
}