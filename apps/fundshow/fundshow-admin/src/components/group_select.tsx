import { Select } from 'antd'

export default function GroupSelect({ value, onChange }: { value?: any; onChange?: (v: any) => void }) {
  return (
    <Select
      placeholder="选择分组"
      options={[
        { label: '禅悦', value: '禅悦' },
        { label: '禅乐', value: '禅乐' },
      ]}
      value={value}
      onChange={(v) => {
        if (onChange) onChange(v)
      }}
    ></Select>
  )
}
