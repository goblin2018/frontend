import { getx } from '@/lib/http'

export interface Question {
  id: string
  scale_id: string
  sort: number
  title: string
  // content: string;
  options: QuestionOption[]
  create_at: number
  update_at: number
}

export interface QuestionOption {
  title: string
  score: number
}

export interface Answer {
  question_id: string
  answer: string
}

export async function listQuestions(scaleId: string) {
  const res = await getx<{ items: Question[]; total: number }>('api/question', {
    scale_id: scaleId,
  })
  return res
}
