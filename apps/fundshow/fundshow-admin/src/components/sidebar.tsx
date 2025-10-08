import { Menu, MenuProps } from 'antd'
import { NavItem } from 'pages/router'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function getItem({ label, icon, children, type, path }: NavItem) {
  return {
    key: path || label,
    icon,
    children,
    label,
    type,
  }
}

const getItems = (items: NavItem[]) => {
  return items.map((f) => {
    let it = getItem(f)

    if (f.children) {
      let cs = f.children.filter((c) => c.hide != true)
      it!.children = getItems(cs)
    }
    return it
  })
}

export default function Sidebar({ items }: { items: NavItem[] }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [key, setKey] = useState<string>('/')
  useEffect(() => {
    setKey(location.pathname)
  }, [location])

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key as string)
    setKey(e.key as string)
  }

  return (
    <Menu
      className="pt-4"
      onClick={onClick}
      style={{ width: 200 }}
      selectedKeys={[key]}
      mode="inline"
      items={getItems(items) as any}
    />
  )
}
