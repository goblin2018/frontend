import { getx, postx } from '@/lib/http'
import type { Answer, Question } from '@/types/question'
import { listQuestions } from '@/types/question'
import { getScale, listScales, type ScaleResultItem, type Scale } from '@/types/scale'
import type { UserScale } from '@/types/user-scale'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

interface State {
  curr?: Scale | null
  questionIdx: number
  items: Scale[]
  questions: Question[]
  answers: Answer[]
  start_at: number
  currResult: UserScale | null
}

//  持久化一下user 避免频繁的重新登录
export const useScaleStore = defineStore('scale', {
  state: (): State => ({
    curr: undefined,
    items: [],
    questionIdx: 0,
    questions: [],
    answers: [],
    start_at: 0,
    currResult: null,
  }),
  getters: {
    currQuestion: (state) => state.questions[state.questionIdx],
    isFirstQuestion: (state) => state.questionIdx === 0,
    isLastQuestion: (state) => state.questionIdx === state.questions.length - 1,
    currAnswer: (state) => state.answers[state.questionIdx]?.answer,
  },
  actions: {
    async loadScaleList() {
      const res = await listScales()
      this.items = res.items
    },

    async loadScale(id: string) {
      if (!id) {
        this.curr = null
        return
      }

      if (id != this.curr?.id) {
        this.curr = null
        const res = await getScale(id)
        this.curr = res
      }
      // 如果相同，则不需要加载
    },
    async loadQuestions() {
      if (!this.curr) {
        return
      }
      const res = await listQuestions(this.curr.id)
      this.questions = res.items
      this.questionIdx = 0
      this.start_at = dayjs().unix()
      // 组装下answers
      this.answers = this.questions.map((q) => ({
        question_id: q.id,
        answer: '',
      }))
    },
    goNextQuestion() {
      if (this.currAnswer) {
        if (this.questionIdx < this.questions.length - 1) {
          this.questionIdx++
        }
      } else {
        uni.showToast({
          title: '请选择一个选项',
          icon: 'none',
        })
      }
    },
    goPrevQuestion() {
      if (this.questionIdx > 0) {
        this.questionIdx--
      }
    },
    selectOption(value: string) {
      this.answers[this.questionIdx].answer = value
    },

    exit() {
      this.answers = []
      this.questionIdx = 0
    },
    async submit({ score, result }: { score?: number; result?: ScaleResultItem }) {
      if (this.isLastQuestion && this.currAnswer) {
        const res = await postx<UserScale>('api/user-scale', {
          scale_id: this.curr?.id,
          start_at: this.start_at,
          end_at: dayjs().unix(),
          answers: this.answers,
          score,
          result,
        })
        this.currResult = res.data
        this.exit()
      } else {
        uni.showToast({
          title: '请回答最后一个问题',
          icon: 'none',
        })
      }
    },
  },
})
