import type { SelectorOption } from '@/components/selector/selector'

export interface Feedback {
  id?: string
  category: FeedbackCategory
  user_id: string
  info: string
}

export enum FeedbackCategory {
  Problem = 1,
  Suggestion = 2,
  Other = 3,
}

export const FeedbackOptions: SelectorOption[] = [
  {
    label: '产品问题',
    value: FeedbackCategory.Problem,
  },
  {
    label: '功能建议',
    value: FeedbackCategory.Suggestion,
  },
  {
    label: '其他',
    value: FeedbackCategory.Other,
  },
]
