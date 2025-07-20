import { createSSRApp } from 'vue'
import 'uno.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(
  createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  }),
)

export function createApp() {
  const app = createSSRApp(App)

  // Configure store
  app.use(store)

  return {
    app,
  }
}
