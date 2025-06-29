import { formatLen } from '@/lib/time'
import { getOne } from '@/page_report/components/tip'
import type { Train } from '@/types/train'
import dayjs from 'dayjs'
import { drawCenterText, drawImage, drawLogoInfo, drawUserInfo } from './draw'

export interface ShareCanvasOptions {
  canvasId: string
  width: number
  height: number
  result: Train
  userAvatar?: string
  mindfulImg: string
}

export async function drawShareCanvas(options: ShareCanvasOptions): Promise<void> {
  const { canvasId, width, height, result, userAvatar, mindfulImg } = options

  console.log('开始绘制 canvas')
  const ctx = uni.createCanvasContext(canvasId)
  if (!ctx) {
    console.error('创建 canvas context 失败')
    return
  }

  // 设置图片平滑
  // @ts-ignore
  ctx.imageSmoothingEnabled = true
  // @ts-ignore
  ctx.imageSmoothingQuality = 'high'
  ctx.setFillStyle('#F8FAFC')
  ctx.fillRect(0, 0, width, height)

  drawLogoInfo(ctx, { x: 16, y: 16 }, 'light') // 使用固定尺寸
  if (userAvatar) {
    await drawUserInfo(ctx, { x: width - 40 - 16, y: 16 }, userAvatar) // 使用固定尺寸
  }

  await drawImage({ ctx, x: 34, y: 88, w: 259, h: 193, src: mindfulImg })

  let tipInfo = result.tip
  if (!tipInfo) {
    const tip = await getOne()
    tipInfo = tip.info
  }
  await drawCenterText({ ctx, y: 329, text: `"${tipInfo}"`, color: '#020617' })

  // 绘制练习信息背景
  const bgX = (width - 295) / 2 // 水平居中
  const bgY = 465
  ctx.fillStyle = '#fff'
  // 绘制圆角矩形
  const radius = 12
  ctx.beginPath()
  ctx.moveTo(bgX + radius, bgY)
  ctx.lineTo(bgX + 295 - radius, bgY)
  ctx.arcTo(bgX + 295, bgY, bgX + 295, bgY + radius, radius)
  ctx.lineTo(bgX + 295, bgY + 128 - radius)
  ctx.arcTo(bgX + 295, bgY + 128, bgX + 295 - radius, bgY + 128, radius)
  ctx.lineTo(bgX + radius, bgY + 128)
  ctx.arcTo(bgX, bgY + 128, bgX, bgY + 128 - radius, radius)
  ctx.lineTo(bgX, bgY + radius)
  ctx.arcTo(bgX, bgY, bgX + radius, bgY, radius)
  ctx.closePath()
  ctx.fill()

  // 绘制练习信息文字
  ctx.fillStyle = '#64748b' // text-slate-500
  ctx.setFontSize(16) // 只在开始时设置一次字体大小
  ctx.setTextAlign('left')

  const textX = bgX + 12 // padding-left: 12px
  const rightTextX = bgX + 295 - 12 // padding-right: 12px
  let textY = bgY + 30 // 第一行文字位置

  // 绘制练习内容
  ctx.fillText('练习内容', textX, textY)
  ctx.fillStyle = '#475569' // text-slate-950
  ctx.setTextAlign('right')
  ctx.font = '600 16px' // 只设置字重
  ctx.fillText(result?.name || '', rightTextX, textY)

  // 绘制练习时长
  textY += 40 // gap-4 (16px) + line-height
  ctx.setTextAlign('left')
  ctx.fillStyle = '#64748b'
  ctx.font = '16px' // 恢复正常字重
  ctx.fillText('练习时长', textX, textY)
  ctx.fillStyle = (result?.len || 0) < 60 ? '#f59e0b' : '#475569' // text-amber-500 : text-slate-950
  ctx.setTextAlign('right')
  ctx.font = '600 16px' // 只设置字重
  ctx.fillText(formatLen(result?.len || 0, true), rightTextX, textY)

  // 绘制练习时间
  textY += 40
  ctx.setTextAlign('left')
  ctx.fillStyle = '#64748b'
  ctx.font = '16px' // 恢复正常字重
  ctx.fillText('练习时间', textX, textY)
  ctx.fillStyle = '#475569'
  ctx.setTextAlign('right')
  ctx.font = '600 16px' // 只设置字重
  ctx.fillText(dayjs.unix(result?.start_at || 0).format('YYYY/MM/DD HH:mm'), rightTextX, textY)

  // 绘制底部图标
  drawLogoInfo(ctx, { x: 119, y: height - 57 }, 'light')

  // 最终绘制
  await new Promise<void>((resolve) => {
    ctx.draw(true, () => {
      console.log('Canvas 绘制完成')
      resolve()
    })
  })
}
