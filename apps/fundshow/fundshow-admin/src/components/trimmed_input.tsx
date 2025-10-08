import { Input } from 'antd'

const TrimmedInput = (props) => {
  const handleInputChange = (e) => {
    const { value } = e.target
    const trimmedValue = value.trim()
    // 这里可以处理trimmedValue，例如更新state或者调用其他函数
    if (props.onChange) {
      props.onChange(trimmedValue)
    }
  }

  return <Input {...props} onChange={handleInputChange} />
}

export default TrimmedInput
