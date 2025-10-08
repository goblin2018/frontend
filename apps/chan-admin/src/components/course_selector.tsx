import { Select } from 'antd'
import { pinyinSearch } from 'lib/pinyin_search'
import { Group } from 'types/group'

export default function GroupSelector({
  groups,
  value,
  onChange,
}: {
  groups: Group[]
  value?: any
  onChange?: (v: any) => void
}) {
  return (
    <Select
      placeholder="选择课程"
      options={groups.map((c) => ({
        label: c.name,
        value: c.id,
      }))}
      value={value}
      onChange={(v) => {
        if (onChange) onChange(v)
      }}
      filterOption={pinyinSearch}
    ></Select>
  )
}
