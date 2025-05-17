import type { Train, TrainFileInfo } from '@/types/train'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import dayjs from 'dayjs'
import type { SensorData } from '@/lib/ble'
import type { Music } from '@/types/music'

// 计算走神
// 连续 10s 专注度平均值 < 40 时,认为是走神
const distract_threshold = 80
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
}

interface TrainTmp {
  curr_focus: number
  curr_relax: number
  data: TrainFileInfo
  // 计算走神的起始点
  distraction_start_point: number

  // sum: number
  // theta_sum: number
  // delta_sum: number
  // l_gamma_sum: number
  // l_beta_sum: number
  // l_aplha_sum: number
  // h_gamma_sum: number
  // h_beta_sum: number
  // h_aplha_sum: number

  zen1_curr_duration: number
  zen2_curr_duration: number
  zen3_curr_duration: number
  zen1_max_duration: number
  zen2_max_duration: number
  zen3_max_duration: number

  flow1_curr_duration: number
  flow1_max_duration: number
  flow2_curr_duration: number
  flow2_max_duration: number
  flow3_curr_duration: number
  flow3_max_duration: number
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
  // sum: 0,
  // theta_sum: 0,
  // delta_sum: 0,
  // l_gamma_sum: 0,
  // l_beta_sum: 0,
  // l_aplha_sum: 0,
  // h_gamma_sum: 0,
  // h_beta_sum: 0,
  // h_aplha_sum: 0,

  zen1_curr_duration: 0,
  zen2_curr_duration: 0,
  zen3_curr_duration: 0,
  zen1_max_duration: 0,
  zen2_max_duration: 0,
  zen3_max_duration: 0,

  flow1_curr_duration: 0,
  flow1_max_duration: 0,
  flow2_curr_duration: 0,
  flow2_max_duration: 0,
  flow3_curr_duration: 0,
  flow3_max_duration: 0,
}

const initTrain: Train = {
  user_id: '',
  total_len: 0,
  music_id: '',
  free_len: 0,
  start_at: 0,
  len: 0,
  zen1: 0,
  zen2: 0,
  zen3: 0,
  flow1: 0,
  flow2: 0,
  flow3: 0,
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

export const useTrainStore = defineStore({
  id: 'train',
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
  }),
  getters: {
    started: (state) => {
      return state.train && state.train.start_at > 0
    },
    // canUpload(state) {
    //   return state.report != undefined && state.report.total_len >= min_report_len
    // },
    canUploadFile(state) {
      return state.report != undefined && state.report.len >= min_report_len
    },
  },
  actions: {
    play() {
      this.play_at = dayjs().unix()
      console.log('train play ', this.play_at)
    },
    pause() {
      var len = 0
      if (this.train && this.play_at > 0) {
        len = dayjs().unix() - this.play_at
        this.play_at = 0
        this.train.total_len += len
      }
      console.log('train pause ', this.train?.total_len, len)
    },
    donePlay() {
      console.log('done play ', this.train?.total_len)
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
      } else {
        report.tmp_data = this.train_tmp.data

        // report.delta = this.train_tmp.delta_sum / this.train_tmp.sum
        // report.theta = this.train_tmp.theta_sum / this.train_tmp.sum

        // report.l_alpha = this.train_tmp.l_aplha_sum / this.train_tmp.sum
        // report.h_alpha = this.train_tmp.h_aplha_sum / this.train_tmp.sum
        // report.l_beta = this.train_tmp.l_beta_sum / this.train_tmp.sum
        // report.h_beta = this.train_tmp.h_beta_sum / this.train_tmp.sum
        // report.l_gamma = this.train_tmp.l_gamma_sum / this.train_tmp.sum
        // report.h_gamma = this.train_tmp.h_gamma_sum / this.train_tmp.sum

        report.zen1 = this.train_tmp.zen1_max_duration
        report.zen2 = this.train_tmp.zen2_max_duration
        report.zen3 = this.train_tmp.zen3_max_duration

        report.flow1 = this.train_tmp.flow1_max_duration
        report.flow2 = this.train_tmp.flow2_max_duration
        report.flow3 = this.train_tmp.flow3_max_duration
      }

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

    setTip(tip: string) {
      this.report!.tip = tip
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

      let zen1 = false
      let zen2 = false
      let zen3 = false
      let flow1 = false
      let flow2 = false
      let flow3 = false
      if (s.focus > 60) {
        this.train.focus_total! += 1
      }

      if (s.relax > 60) {
        this.train.relax_total! += 1
      }
      // zen
      if (s.focus >= 50 && s.relax >= 50) {
        zen1 = true
        zen2 = true
        zen3 = true
        flow1 = true
        flow2 = true
        flow3 = true
      } else if (s.focus >= 40 && s.relax >= 40) {
        zen1 = true
        zen2 = true
        flow1 = true
        flow2 = true
        flow3 = true
      } else if (s.focus >= 30 && s.relax >= 30) {
        zen1 = true
        flow1 = true
        flow2 = true
        flow3 = true
      }

      if (zen1) {
        this.train_tmp.zen1_curr_duration += 1
        this.train_tmp.zen1_max_duration = Math.max(this.train_tmp.zen1_curr_duration, this.train_tmp.zen1_max_duration)
      } else {
        this.train_tmp.zen1_curr_duration = 0
      }

      if (zen2) {
        this.train_tmp.zen2_curr_duration += 1
        this.train_tmp.zen2_max_duration = Math.max(this.train_tmp.zen2_curr_duration, this.train_tmp.zen2_max_duration)
      } else {
        this.train_tmp.zen2_curr_duration = 0
      }

      if (zen3) {
        this.train_tmp.zen3_curr_duration += 1
        this.train_tmp.zen3_max_duration = Math.max(this.train_tmp.zen3_curr_duration, this.train_tmp.zen3_max_duration)
      } else {
        this.train_tmp.zen3_curr_duration = 0
      }

      // if (flow1) {
      //   this.train_tmp.flow1_curr_duration += 1
      //   this.train_tmp.flow1_max_duration = Math.max(this.train_tmp.flow1_curr_duration, this.train_tmp.flow1_max_duration)
      // } else {
      //   this.train_tmp.flow1_curr_duration = 0
      // }

      // if (flow2) {
      //   this.train_tmp.flow2_curr_duration += 1
      //   this.train_tmp.flow2_max_duration = Math.max(this.train_tmp.flow2_curr_duration, this.train_tmp.flow2_max_duration)
      // } else {
      //   this.train_tmp.flow2_curr_duration = 0
      // }

      // if (flow3) {
      //   this.train_tmp.flow3_curr_duration += 1
      //   this.train_tmp.flow3_max_duration = Math.max(this.train_tmp.flow3_curr_duration, this.train_tmp.flow3_max_duration)
      // } else {
      //   this.train_tmp.flow3_curr_duration = 0
      // }

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
      // this.train_tmp.sum += total(s)
      // this.train_tmp.theta_sum += s.theta
      // this.train_tmp.delta_sum += s.delta
      // this.train_tmp.l_aplha_sum += s.lowAlpha
      // this.train_tmp.l_beta_sum += s.lowBeta
      // this.train_tmp.l_gamma_sum += s.lowGamma
      // this.train_tmp.h_gamma_sum += s.highGamma
      // this.train_tmp.h_aplha_sum += s.highAlpha
      // this.train_tmp.h_beta_sum += s.highBeta
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
  },
})
