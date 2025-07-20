import type { Train, TrainFileInfo } from '@/types/train'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import dayjs from 'dayjs'
import type { SensorData } from '@/lib/ble'
import type { Music } from '@/types/music'
import { calcFlow, calculateStandardDeviation, calcFocusStatistics } from '@/utils/trainCalculator'
import { postx } from '@/lib/http'
import { getAiReport, selectExperience, listHistory, getPreviousTrain } from '@/types/train'

// 计算走神
// 连续 10s 专注度平均值 < 40 时,认为是走神
const distract_threshold = 40
export const min_report_len = 60

interface TrainState {
  view_only: boolean
  train?: Train
  isFree: boolean
  free_len?: number
  is_distracted: boolean
  train_tmp: TrainTmp
  uploaded: boolean
  training: boolean
  exitDirectly: boolean
  play_at: number
  report?: Train
  // 上传相关状态
  uploadStatus: 'idle' | 'uploading' | 'processing' | 'success' | 'failed'
  uploadProgress: number
  uploadError?: string
  hasUploaded: boolean
  // 练习体验选择状态
  selectedExperience: string
  experienceLoading: boolean
  // 上次训练结果
  previousTrain?: Train
  previousTrainLoading: boolean
}

interface TrainTmp {
  curr_focus: number
  curr_relax: number
  data: TrainFileInfo
  // 计算走神的起始点
  distraction_start_point: number
}

const initTrainTmp: TrainTmp = {
  curr_focus: 0,
  curr_relax: 0,
  distraction_start_point: 0,
  data: {
    focus: [],
    relax: [],
    delta: [],
    theta: [],
    l_alpha: [],
    h_alpha: [],
    l_beta: [],
    h_beta: [],
    l_gamma: [],
    h_gamma: [],
    delta_max: 0,
    theta_max: 0,
    l_alpha_max: 0,
    h_alpha_max: 0,
    l_beta_max: 0,
    h_beta_max: 0,
    l_gamma_max: 0,
    h_gamma_max: 0,
    distraction_points: [],
  },
}

const initTrain: Train = {
  user_id: '',
  total_len: 0,
  music_id: '',
  free_len: 0,
  start_at: 0,
  len: 0,
  relax_total: 0,
  distracted_count: 0,
  relax_min: 0,
  relax_max: 0,
  relax_avg: 0,
  focus_total: 0,
  focus_min: 0,
  focus_max: 0,
  focus_avg: 0,
  data_file: '',
}

export const useTrainStore = defineStore('train', {
  state: (): TrainState => ({
    exitDirectly: false,
    view_only: false,
    train: undefined,
    isFree: false,
    is_distracted: false,
    train_tmp: JSON.parse(JSON.stringify(initTrainTmp)),
    uploaded: false,
    training: false,
    play_at: 0,
    report: undefined,
    // 上传相关状态初始化
    uploadStatus: 'idle',
    uploadProgress: 0,
    uploadError: undefined,
    hasUploaded: false,
    // 练习体验选择状态初始化
    selectedExperience: '',
    experienceLoading: false,
    // 上次训练结果
    previousTrain: undefined,
    previousTrainLoading: false,
  }),
  getters: {
    started: (state) => {
      return state.train && state.train.start_at > 0
    },
    canUploadFile: (state) => {
      return state.report && state.report.len >= min_report_len
    },
  },
  actions: {
    play() {
      this.play_at = dayjs().unix()
      console.log('train play ', this.play_at)
    },
    pause() {
      let len = 0
      if (this.train && this.play_at > 0) {
        len = dayjs().unix() - this.play_at
        this.play_at = 0
        this.train.total_len += len
      }
      console.log('train pause ', this.train?.total_len, len)
    },
    donePlay() {
      console.log('done play ', this.train?.total_len)
      console.log('donePlay hasUploaded:', this.hasUploaded)
      console.log('donePlay current report.id:', this.report?.id)

      // 如果已经上传过（有id），则不要重新设置report，避免覆盖服务器返回的数据
      if (this.hasUploaded && this.report?.id) {
        console.log('已上传，跳过donePlay的report设置')
        this.pause()
        this.training = false
        this.view_only = false
        return
      }

      this.pause()
      this.training = false
      this.view_only = false

      let report = {
        ...this.train,
      } as Train
      if (report.len < min_report_len) {
        report = {
          user_id: report.user_id,
          free_len: report.free_len,
          total_len: report.total_len,
          name: report.name,
          image: report.image,
          music_id: report.music_id,
          start_at: report.start_at,
          len: report.len,
        }

        report.tmp_data = this.train_tmp.data
        this.report = report // ← 确保设置 report，即使时长不够
        return
      }

      // 正常计算结果
      const flowResult = calcFlow(this.train_tmp.data)
      if (flowResult) {
        report.flowStar = flowResult.star
        report.flowDuration = flowResult.duration
        report.flowStartTime = flowResult.startTime
        report.flowEndTime = flowResult.endTime
      }

      // 计算专注度和放松度的标准差
      report.focusFluctuation = calculateStandardDeviation(this.train_tmp.data.focus)
      report.relaxFluctuation = calculateStandardDeviation(this.train_tmp.data.relax)

      // 计算专注度统计
      report.focusStatistics = calcFocusStatistics(this.train_tmp.data.focus, report.len)

      report.tmp_data = this.train_tmp.data

      this.report = report
    },

    reset() {
      console.log('train reset')
      this.train = undefined
      this.train_tmp = JSON.parse(JSON.stringify(initTrainTmp))
      this.uploaded = false
      this.training = false
      this.play_at = 0
      this.isFree = false
      this.view_only = false
      this.exitDirectly = false
      this.is_distracted = false
      // 重置上传状态
      this.uploadStatus = 'idle'
      this.uploadProgress = 0
      this.uploadError = undefined
      this.hasUploaded = false
      // 重置练习体验选择状态
      this.selectedExperience = ''
      this.experienceLoading = false
      // 重置上次训练结果
      this.previousTrain = undefined
      this.previousTrainLoading = false
    },
    startTrain(music: Music) {
      this.reset()
      this.train = {
        ...initTrain,
        image: music.image,
        name: music.name,
        user_id: useUserStore().user?.id || '',
        music_id: music.id,
        start_at: dayjs().unix(),
      }
      this.training = true
    },

    startFreeTrain() {
      this.reset()
      this.train = {
        ...initTrain,
        image: 'free/free.png',
        name: '自由练习',
        user_id: useUserStore().user?.id || '',
        free_len: this.free_len,
        start_at: dayjs().unix(),
      }
      this.training = true
      this.isFree = true
    },

    onSensorData(s: SensorData) {
      if (!this.train) {
        return
      }

      // 如果没开始 则不记录数据
      if (!this.training) {
        return
      }

      // 第一次加入数据
      if (this.train.len === 0) {
        // 专注
        this.train.focus_avg = s.focus
        this.train.focus_max = s.focus
        this.train.focus_min = s.focus

        // 放松
        this.train.relax_avg = s.focus
        this.train.relax_max = s.focus
        this.train.relax_min = s.focus
      } else {
        // 处理focus数据
        if (s.focus > this.train.focus_max!) {
          this.train.focus_max = s.focus
        } else if (s.focus < this.train.focus_min!) {
          this.train.focus_min = s.focus
        }
        this.train.focus_avg = (this.train.focus_avg! * this.train.len + s.focus) / (this.train.len + 1)

        // 处理relax数据
        if (s.relax > this.train.relax_max!) {
          this.train.relax_max = s.relax
        } else if (s.relax < this.train.relax_min!) {
          this.train.relax_min = s.relax
        }
        this.train.relax_avg = (this.train.relax_avg! * this.train.len + s.relax) / (this.train.len + 1)
      }

      this.train_tmp.data.focus.push(s.focus)
      this.train_tmp.data.relax.push(s.relax)

      this.train_tmp.data.delta.push(s.delta)
      this.train_tmp.data.delta_max = Math.max(this.train_tmp.data.delta_max, s.delta)

      this.train_tmp.data.theta.push(s.theta)
      this.train_tmp.data.theta_max = Math.max(this.train_tmp.data.theta_max, s.theta)

      this.train_tmp.data.l_alpha.push(s.lowAlpha)
      this.train_tmp.data.l_alpha_max = Math.max(this.train_tmp.data.h_alpha_max, s.lowAlpha)

      this.train_tmp.data.h_alpha.push(s.highAlpha)
      this.train_tmp.data.h_alpha_max = Math.max(this.train_tmp.data.h_alpha_max, s.highAlpha)

      this.train_tmp.data.l_beta.push(s.lowBeta)
      this.train_tmp.data.l_beta_max = Math.max(this.train_tmp.data.l_beta_max, s.lowBeta)

      this.train_tmp.data.h_beta.push(s.highBeta)
      this.train_tmp.data.h_beta_max = Math.max(this.train_tmp.data.h_beta_max, s.highBeta)

      this.train_tmp.data.l_gamma.push(s.lowGamma)
      this.train_tmp.data.l_gamma_max = Math.max(this.train_tmp.data.l_gamma_max, s.lowGamma)

      this.train_tmp.data.h_gamma.push(s.highGamma)
      this.train_tmp.data.h_gamma_max = Math.max(this.train_tmp.data.h_gamma_max, s.highGamma)

      this.train_tmp.curr_focus = s.focus
      this.train_tmp.curr_relax = s.relax

      this.train.len += 1
      console.log('train len', this.train.len)

      // 计算是否走神
      if (this.train.len - this.train_tmp.distraction_start_point >= 10) {
        const distraction_value = this.train_tmp.data.focus.slice(-10).reduce((a, b) => a + b, 0) / 10
        if (distraction_value <= distract_threshold) {
          // 走神
          this.train_tmp.distraction_start_point = this.train.len
          this.is_distracted = true
          this.train.distracted_count = this.train.distracted_count ? this.train.distracted_count + 1 : 1

          this.train_tmp.data.distraction_points.push(this.train.len - 1)
        }
      }
    },

    onWearOk(ok: boolean) {
      if (!ok) {
        this.train_tmp.curr_relax = 0
        this.train_tmp.curr_focus = 0
      }
    },

    // 统一的上传逻辑
    async uploadReport(): Promise<{ success: boolean; error?: string; alreadyUploaded?: boolean }> {
      // 如果已经上传过或者不满足上传条件，直接返回成功
      if (this.hasUploaded || !this.canUploadFile) {
        return { success: true, alreadyUploaded: true }
      }

      try {
        this.uploadStatus = 'uploading'
        this.uploadProgress = 0
        this.uploadError = undefined

        // 1. 上传训练数据文件
        const jsonStr = JSON.stringify(this.report?.tmp_data)
        // const path = wx.env.USER_DATA_PATH + '/tmp.json'
        // wx.getFileSystemManager().writeFileSync(path, jsonStr)

        // const userStore = useUserStore()
        // const file = await uploadFile(path, `mindsensor/train/${userStore.user?.id}`, (progress) => {
        //   this.uploadProgress = Math.round(progress)
        // })

        // this.uploadStatus = 'processing'

        // 2. 准备上传的数据

        // 3. 提交训练结果
        const res = await postx<Train>('api/train', { ...this.report, tmpData: jsonStr, version: 2 })
        console.log('uploadReport resxxxxxx', res, 'xxxxxxx')

        this.uploadStatus = 'success'
        this.hasUploaded = true

        // 添加调试信息，确认 this 指向和数据设置
        console.log('Before setting report, this.report:', this.report)
        console.log('res.data:', res.data)
        console.log('uploadReport store实例:', this)
        console.log('uploadReport store.$id:', this.$id)

        this.report = { ...res.data, tmp_data: this.report.tmp_data }

        console.log('After setting report, this.report:', this.report)
        console.log('this.report.id:', this.report?.id)

        // 确保响应式更新完成
        await new Promise((resolve) => setTimeout(resolve, 100))

        return { success: true }
      } catch (error: any) {
        this.uploadStatus = 'failed'
        this.uploadError = error.message || '上传失败'
        return { success: false, error: this.uploadError }
      }
    },

    // 重置上传状态
    resetUploadStatus() {
      this.uploadStatus = 'idle'
      this.uploadProgress = 0
      this.uploadError = undefined
    },

    async getAiReport() {
      console.log('getAiReport', this.report.id)
      if (!this.report?.id) {
        return null
      }

      try {
        const aiReport = await getAiReport(this.report.id)
        if (aiReport) {
          this.report.aiReport = aiReport
          return aiReport
        }

        return null
      } catch (error: any) {
        return null
      }
    },

    // 选择练习体验
    async selectPracticeExperience(value: string): Promise<{ success: boolean; error?: string }> {
      // 防止重复选择或正在加载
      if (this.selectedExperience === value || this.experienceLoading) {
        return { success: true }
      }

      // 调试信息：检查 report 状态
      console.log('selectPracticeExperience - report:', this.report)
      console.log('selectPracticeExperience - report.id:', this.report?.id)
      console.log('selectPracticeExperience - hasUploaded:', this.hasUploaded)

      // 如果报告还没有ID（未上传），则只更新本地状态，不调用API
      if (!this.report?.id) {
        console.log('报告未上传，仅更新本地状态')
        this.selectedExperience = value

        // 更新report中的数据
        if (this.report) {
          this.report.practiceExperience = value
        }

        return { success: true }
      }

      try {
        this.experienceLoading = true

        // 调用后端接口记录选择
        await selectExperience({
          id: this.report.id,
          practiceExperience: value,
        })

        // API调用成功，更新本地状态
        this.selectedExperience = value

        // 更新report中的数据
        if (this.report) {
          this.report.practiceExperience = value
        }

        return { success: true }
      } catch (error: any) {
        console.error('选择练习体验失败:', error)
        return { success: false, error: error.message || '选择失败' }
      } finally {
        this.experienceLoading = false
      }
    },

    // 获取上次训练结果
    async getPreviousTrain(): Promise<Train | null> {
      // 如果已经加载过，直接返回
      if (this.previousTrain) {
        return this.previousTrain
      }

      // 如果正在加载，等待
      if (this.previousTrainLoading) {
        return null
      }

      try {
        this.previousTrainLoading = true

        // 获取最近的训练记录（排除当前训练）
        const res = await getPreviousTrain(this.report.id)

        if (res) {
          this.previousTrain = res
          return res
        }

        return null
      } catch (error) {
        console.error('获取上次训练结果失败:', error)
        return null
      } finally {
        this.previousTrainLoading = false
      }
    },
  },
})
