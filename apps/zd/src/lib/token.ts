export function getToken(): string {
  return uni.getStorageSync('token') || ''
}

export function setToken(token: string) {
  uni.setStorageSync('token', token)
}
