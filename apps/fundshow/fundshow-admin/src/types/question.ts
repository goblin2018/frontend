import { delx, postx, putx } from "lib/axios";
import useList from "lib/useList";

export interface Question {
  id: string;
  scale_id: string;
  sort: number;
  title: string;
  // content: string;
  options: QuestionOption[];
  create_at: number;
  update_at: number;
}

export interface QuestionOption {
  title: string;
  score: number;
}

const baseUrl = "api/question";

export async function addQuestion(data: Question) {
  return postx(`${baseUrl}`, data);
}

export async function updateQuestion(data: Question) {
  return putx(`${baseUrl}`, data);
}

export async function delQuestion(id: string) {
  return delx(`${baseUrl}/${id}`);
}

export function useQuestionList(opt: {
  page: number;
  size: number;
  scale_id?: string;
}) {
  return useList<Question>(baseUrl, opt);
}
