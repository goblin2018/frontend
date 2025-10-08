import AboutPage from 'pages/about'
import CasePage from 'pages/case'
import FinancePage from 'pages/finance'
import Home from 'pages/home'
import LawPage from 'pages/law'
import ManagementPage from 'pages/management'
import NewsPage from 'pages/news'
import { createBrowserRouter } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/law',
    element: <LawPage />
  },
  {
    path: '/finance',
    element: <FinancePage />
  },
  {
    path: '/management',
    element: <ManagementPage />
  },
  {
    path: '/case',
    element: <CasePage />
  },
  {
    path: '/news',
    element: <NewsPage />
  },
  {
    path: '/about',
    element: <AboutPage />
  }
]

const router = createBrowserRouter(routes)

export default router
