/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_OSS_URL: string
  readonly VITE_BASE_URL: string
  readonly VITE_UPLOAD_URL: string
  readonly VITE_APP_CACHE_PREFIX: string
  readonly VITE_PORT: number
  readonly VITE_USE_MOCK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
