import { createSSRApp } from 'vue'
import 'uno.css'
import App from './App.vue'

const store = createPinia()


export function createApp() {
  const app = createSSRApp(App)

  // Configure store
  app.use(store)

  return {
    app,
  }
}
