import { ConfigEnv, loadEnv, UserConfig } from 'vite'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  console.log('Project root:', root)
  return {
    base: './',
    // 设置路径别名
    resolve: {
      alias: {
        '@': resolve('./src'),
        // 正确指向ui-uni组件库
        '@assets': resolve(__dirname, '../../../packages/assets'),
        // 确保可以直接解析到组件源文件
        '@frontend/ui-uni': resolve('/Users/zhangyinlei/workspace/frontend/packages/ui-uni'),
      },
      extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    // 自定义全局变量
    define: {
      'process.env': {},
    },
    optimizeDeps: {
      include: ['vue'],
      exclude: [],
    },
    // 开发服务器配置
    server: {
      host: true,
      // open: true,
      port: env.VITE_PORT as any,
    },
    // 构建配置
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // 使用非路径的名称模式
          chunkFileNames: (chunkInfo) => {
            const id = chunkInfo.facadeModuleId || ''
            if (id.includes('@frontend/ui-uni/src/components')) {
              // 为ui组件生成安全的文件名
              const name = id.split('/').pop()?.replace(/\./g, '-') || 'ui-component'
              return `static/js/components/${name}-[hash].js`
            }
            return 'static/js/[name]-[hash].js'
          },
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
        // 不将ui组件标记为external
        external: [],
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
  }
}
