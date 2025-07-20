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
}

export async function drawShareCanvas(options: ShareCanvasOptions): Promise<void> {
  const { canvasId, width, height, result, userAvatar } = options

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
  ctx.setFillStyle('#fff')
  ctx.fillRect(0, 0, width, height)

  drawLogoInfo(ctx, { x: 20, y: 28 }, 'light') // 使用固定尺寸
  if (userAvatar) {
    await drawUserInfo(ctx, { x: width - 20 - 28, y: 28 }, userAvatar) // 使用固定尺寸
  }

  await drawImage({ ctx, x: 20, y: 74, w: 304, h: 316, src: 'https://cyue.oss-cn-shenzhen.aliyuncs.com/assets/report-share-bg.png' })

  let tipInfo = result.tip
  if (!tipInfo) {
    const tip = await getOne()
    tipInfo = tip.info
  }
  await drawCenterText({ ctx, y: 234, text: `"${tipInfo}"`, paddingStart: 20 })

  // 绘制 score
  ctx.setFillStyle('#fff')
  ctx.font = 'bold 18px'

  ctx.setTextAlign('center')
  ctx.fillText(`${result.focus_avg.toFixed(1)}分`, 80 + 20, 252 + 74 + 27)
  ctx.fillText(result.flowStar > 0 ? `${result.flowStar}星` : '未达成', 225 + 20, 252 + 74 + 27)

  // 绘制练习信息文字
  const textX = 20
  let textY = 16 + 16 + 16 + 28 + 28 + 316

  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)' // 黑色 35% 透明度

  ctx.setFontSize(12) // 只在开始时设置一次字体大小
  ctx.setTextAlign('left')
  // 绘制名称
  ctx.fillText(result?.name || '', textX, textY)

  // 计算名称文本宽度并绘制分割线
  const nameText = result?.name || ''
  const nameTextWidth = ctx.measureText(nameText).width
  const dividerX = textX + nameTextWidth + 4 // 名称后留8px间距

  // 绘制竖立分割线
  ctx.setStrokeStyle('rgba(0, 0, 0, 0.15)')
  ctx.setLineWidth(1)
  ctx.beginPath()
  ctx.moveTo(dividerX, textY - 9) // 从文本基线向上9px
  ctx.lineTo(dividerX, textY) // 到文本基线
  ctx.stroke()

  // 绘制练习时长
  ctx.fillText(formatLen(result.len, true, true), dividerX + 4, textY) // 分割线后留8px间距

  // 绘制开始时间
  ctx.setTextAlign('right')
  ctx.fillText(dayjs.unix(result?.start_at || 0).format('YYYY/MM/DD HH:mm'), width - 20, textY)

  // 最终绘制
  await new Promise<void>((resolve) => {
    ctx.draw(true, () => {
      console.log('Canvas 绘制完成')
      resolve()
    })
  })
}
