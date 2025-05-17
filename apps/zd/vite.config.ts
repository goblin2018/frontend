import { ConfigEnv, loadEnv, UserConfig } from 'vite'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    base: './',
    // 设置路径别名
    resolve: {
      alias: {
        '@': resolve('./src'),
        // 使用easycom方式，不需要此别名
      },
      extensions: ['.js', '.json', '.ts', '.vue'],
    },
    // 自定义全局变量
    define: {
      'process.env': {},
    },
    // 开发服务器配置
    server: {
      host: true,
      // open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:9101/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/upload': {
          target: 'http://localhost:9101/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/upload/, ''),
        },
      },
    },
    // 构建配置
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].${new Date().getTime()}.js`,
          chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
          assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
          compact: true,
        },
      },
    },
    // 插件
    plugins: [
      uni(),
      Unocss({
        configFile: './uno.config.ts',
      }),
      // 自动导入
      AutoImport({
        imports: ['vue', 'uni-app', 'pinia'],
        dts: 'typings/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        },
      }),
    ],

    css: {
      preprocessorOptions: {
        scss: {
          // api: 'modern',
        },
      },
    },
  }
}
