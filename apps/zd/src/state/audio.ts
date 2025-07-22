import type { Music } from '@/types/music'
import { defineStore } from 'pinia'
import { ossUrl } from '@/lib/oss'
import { useSettingsStore } from '@/state/settings'
import { getAudioManager } from '@/lib/audio-manager-simple'

interface AudioState {
  playing: boolean
  loading: boolean
  currentTime: number
  duration: number
  music?: Music
  beforeDragPlayging: boolean
  isDragging: boolean
  isAlertPlaying: boolean
}

export const useAudioStore = defineStore(
  "audio",
  {
    state: (): AudioState => {
      // 从设置中获取音量
      return {
        loading: false,
        playing: false,
        currentTime: 0,
        duration: 0,
        music: undefined,
        beforeDragPlayging: false,
        isDragging: false,
        isAlertPlaying: false,
      }
    },
    getters: {
      slidePosition: (state) => Math.ceil(state.currentTime),
      audioManager: () => getAudioManager(),
    },
    actions: {
      // 初始化音频管理器
      initAudioManager() {
        const manager = getAudioManager()

        // 直接设置回调函数
        manager.onTimeUpdate = (time) => {
          if (!this.isDragging) {
            this.currentTime = time
          }
        }

        manager.onEnded = () => {
          this.playing = false
        }

        manager.onPlay = () => {
          this.playing = true
        }

        manager.onPause = () => {
          this.playing = false
        }

        manager.onCanplay = () => {
          this.loading = false
        }

        manager.onError = (error) => {
          console.error('Music playback error:', error)
          this.playing = false
          this.loading = false
        }


      },


      play() {
        this.audioManager.play()
      },



      // 播放音乐
      playMusic(music: Music, forceReInit: boolean = true) {
        this.music = music
        this.duration = music.len || 0
        const src = ossUrl(music.url)

        this.audioManager.playMusic(src, forceReInit)
      },


      initMusic(music: Music) {
        this.music = music
        this.duration = music.len || 0
        const src = ossUrl(music.url)
        this.audioManager.initMusic(src)
      },

      setSrc(src: string) {
        this.audioManager.setSrc(src)
      },

      // 暂停音乐
      pauseMusic() {
        this.audioManager.pauseMusic()
      },

      // 停止音乐
      stopMusic() {
        this.audioManager.stopMusic()
      },

      // 跳转到指定位置
      seekMusic(position: number) {
        this.audioManager.seekMusic(position)
        this.currentTime = position
      },

      // 播放走神提示音
      playDistractionAlert() {
        this.isAlertPlaying = true
        // 如果没有提供音量，则使用设置中的音量
        const settingsStore = useSettingsStore()
        this.audioManager.playAlert(settingsStore.distraction_volume )

        setTimeout(() => {
          this.isAlertPlaying = false
        }, 1000)
      },

      // 重置状态
      reset() {
        this.loading = false
        this.playing = false
        this.currentTime = 0
        this.duration = 0
        this.music = undefined
        this.beforeDragPlayging = false
        this.isDragging = false
        this.isAlertPlaying = false
        this.audioManager.stopMusic()
        // 保持音量设置与 settings store 同步
        // destroyAudioManager()
      },
    },
  })
