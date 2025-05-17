
export const checkPermission = async (scope: string ): Promise<boolean> => {
  return new Promise((resolve) => {
    uni.authorize({
      scope: scope,
      success() {
        resolve(true)
      },
      fail() {
        resolve(false)
      },
    })
  })
}
