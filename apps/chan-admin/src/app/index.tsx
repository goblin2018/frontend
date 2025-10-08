import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import { webTheme } from 'lib/antTheme'
import { get2 } from 'lib/axios'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { SWRConfig } from 'swr'
import './index.css'
import createRouter from './router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN} theme={webTheme} componentSize={'middle'}>
    <SWRConfig value={{ fetcher: get2 }}>
      <RouterProvider router={createRouter()} />
    </SWRConfig>
  </ConfigProvider>
)
