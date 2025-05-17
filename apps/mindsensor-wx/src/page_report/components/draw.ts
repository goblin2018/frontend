import { ossUrl } from '@/lib/oss'

export function drawRadius({ ctx, width = 327, height = 674, radius = 12 }: { ctx: UniApp.CanvasContext; width?: number; height: number; radius?: number }) {
  ctx.beginPath()
  ctx.moveTo(radius, 0)
  ctx.lineTo(width - radius, 0)
  ctx.arcTo(width, 0, width, radius, radius)
  ctx.lineTo(width, height - radius)
  ctx.arcTo(width, height, width - radius, height, radius)
  ctx.lineTo(radius, height)
  ctx.arcTo(0, height, 0, height - radius, radius)
  ctx.lineTo(0, radius)
  ctx.arcTo(0, 0, radius, 0, radius)
  ctx.closePath()
}

export function drawLogoInfo(ctx: UniApp.CanvasContext, startPoint: { x: number; y: number }, theme: 'light' | 'dark' = 'dark') {
  if (theme === 'dark') {
    ctx.setGlobalAlpha(0.65)
  } else {
    ctx.setGlobalAlpha(0.5)
  }
  let logoImg = '/static/images/brainx-white.png'
  if (theme === 'light') {
    logoImg = '/static/images/brainx-black.png'
  }

  // 绘制logo
  ctx.drawImage(logoImg, startPoint.x, startPoint.y + 3, 18, 18)

  // 调整文字位置以对齐 logo
  ctx.setFontSize(12)
  if (theme === 'dark') {
    ctx.setFillStyle('#ffffff')
  } else {
    ctx.setFillStyle('#000000')
  }
  ctx.setTextAlign('left')
  ctx.setTextBaseline('middle') // 设置文字垂直对齐方式为中间
  const logoTextY = startPoint.y + 12 // logo中心点的y坐标 (3 + 18/2)
  ctx.fillText('意念精灵MindSensor', startPoint.x + 20, logoTextY)
  ctx.setGlobalAlpha(1)
  ctx.setTextBaseline('normal') // 恢复默认值
}

async function getImagePath(src: string): Promise<string> {
  return new Promise((resolve) => {
    uni.getImageInfo({
      src,
      success: (res) => {
        resolve(res.path)
      },
    })
  })
}

// 添加用户信息绘制函数
export async function drawUserInfo(ctx: UniApp.CanvasContext, startPoint: { x: number; y: number }, src: string) {
  const avatarSize = 40
  const x = startPoint.x // 右侧边距
  const topPadding = startPoint.y // 顶部边距

  // 绘制头像
  const avatarUrl = await getImagePath(ossUrl(src))

  ctx.save()
  ctx.beginPath()
  // 将头像移到右侧

  ctx.arc(x + avatarSize / 2, topPadding + avatarSize / 2, avatarSize / 2, 0, 2 * Math.PI)
  ctx.clip()
  ctx.drawImage(avatarUrl, x, topPadding, avatarSize, avatarSize)
  ctx.restore()
}

export async function drawImage({ ctx, x, y, w, h, src }: { ctx: UniApp.CanvasContext; x: number; y: number; w: number; h: number; src: string }) {
  const imageUrl = await getImagePath(src)
  ctx.drawImage(imageUrl, x, y, w, h)
}

export function drawCenterText({
  ctx,
  width = 327,
  y,
  text,
  px = 16,
  fontSize = 16,
  leading = 24,
  color = '#fff',
}: {
  ctx: UniApp.CanvasContext
  y: number
  text: string
  width?: number
  px?: number
  fontSize?: number
  leading?: number
  color?: string
}) {
  const maxWidth = width - px * 2
  ctx.setFontSize(fontSize)
  ctx.setTextAlign('center')
  ctx.setFillStyle(color)

  // 计算文字换行
  const words = text.split('')
  let line: string = ''
  let lines: string[] = []
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i]
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && i > 0) {
      lines.push(line)
      line = words[i]
    } else {
      line = testLine
    }
  }
  lines.push(line)

  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, y + index * leading)
  })
}
