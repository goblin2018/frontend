import { Outlet } from 'react-router-dom'
import Guard from './guard'

export default function AdminGuard() {
  return (
    <Guard>
      <Outlet />
    </Guard>
  )
}
