import { checkPermission } from '@/page_report/components/permission'

export async function startShare({ onShare }: { onShare: () => Promise<void> }) {
  const hasPermission = await checkPermission('scope.writePhotosAlbum')
  if (!hasPermission) {
    uni.showModal({
      title: '提示',
      content: '需要授权保存图片到相册',
      success: (res) => {
        if (res.confirm) {
          uni.openSetting()
        }
      },
    })
    return
  }

  uni.showLoading({ title: '准备中...' })
  await onShare()
  uni.hideLoading()
}

export async function saveCanvas({
  canvasId = 'shareCanvas',
  width,
  height,
  onSuccess,
  onFail,
}: {
  canvasId: string
  width: number
  height: number
  onSuccess?: () => void
  onFail?: () => void
}) {
  const dpr = uni.getWindowInfo().pixelRatio || 2
  const res = await uni.canvasToTempFilePath({
    canvasId,
    destWidth: width * dpr, // 增加保存时的分辨率
    destHeight: height * dpr,
    quality: 1, // 使用最高质量
    success: (res) => {
      uni.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: () => {
          uni.showToast({
            title: '保存成功',
            icon: 'success',
          })
          onSuccess?.()
        },
        fail: () => {
          uni.showToast({
            title: '保存失败',
            icon: 'none',
          })
          onFail?.()
        },
      })
    },
    fail: () => {
      uni.showToast({
        title: '生成图片失败',
        icon: 'none',
      })
    },
  })
}
