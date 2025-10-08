import { delx, postx, putx } from "lib/axios";
import useList from "lib/useList";

export interface Scale {
  id: string;
  name: string;
  abbr?: string;
  sort: number;
  ratio?: number;
  intro: string;
  estimated_time: number; // 预计时长(分钟)
  score_desc: string; // 得分描述
  question_count: number;
  result_desc: ScaleResultItem[]; // 结果描述
  create_at: number;
  update_at: number;
}

export interface ScaleResultItem {
  max: number;
  brief: string;
  desc: string;
}

const baseUrl = "api/scale";

export async function addScale(data: Scale) {
  return postx(`${baseUrl}`, data);
}

export async function updateScale(data: Scale) {
  return putx(`${baseUrl}`, data);
}

export async function delScale(id: string) {
  return delx(`${baseUrl}/${id}`);
}

export function useScaleList(opt: {
  page?: number;
  size?: number;
  state?: number;
}) {
  return useList<Scale>(baseUrl, opt);
}
