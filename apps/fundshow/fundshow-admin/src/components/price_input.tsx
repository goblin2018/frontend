import { InputNumber } from 'antd'

const PriceInput = (props) => {
  const { value: initValue } = props
  let getInitValue = () => {
    if (initValue) {
      return initValue / 100
    }
    return 0
  }
  const handlePriceChange = (value) => {
    if (props.onChange) {
      //
      let v = Math.round(value * 100)
      props.onChange(v)
    }
  }

  return (
    <InputNumber
      min={0}
      step={0.01}
      precision={2}
      {...props}
      controls={false}
      value={getInitValue()}
      formatter={(value) => {
        console.log('value is ', value)
        if (!value) {
          return ''
        }
        if (typeof value === 'string') {
          return `${parseFloat(value)}`
        }
        return `${value}`
      }}
      onChange={handlePriceChange}
    />
  )
}

export default PriceInput
