import { useEffect, useRef, useState } from 'react'

interface ItemInfo {
  title: string
  key: string
}

export default function Tab({
  items,
  activeIndex,
  onChange,
}: {
  items: ItemInfo[]
  activeIndex: number
  onChange: (index: number) => void
}) {
  useEffect(() => {}, [activeIndex])

  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  return (
    <div className="flex h-12 items-center relative">
      {items.map((item, index) => {
        return (
          <TabItem
            key={item.key}
            title={item.title}
            active={index === activeIndex}
            onClick={() => onChange(index)}
            setLeft={setLeft}
            setWidth={setWidth}
          />
        )
      })}
      <div
        className="absolute border-b-2 border-blue-500 bottom-0"
        style={{ width: width, left: left }}
      ></div>
    </div>
  )
}

function TabItem({
  title,
  active,
  onClick,
  setWidth,
  setLeft,
}: {
  title: string
  active: boolean
  onClick: () => void
  setLeft: (left: number) => void
  setWidth: (width: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (active) {
      setLeft(ref.current?.offsetLeft || 0)
      setWidth(ref.current?.offsetWidth || 0)
    }
  }, [active])

  return (
    <div
      ref={ref}
      className={`mr-4 ${active ? 'text-blue-500' : '' } hover:text-blue-500`}
      onClick={onClick}
    >
      {title}
    </div>
  )
}
