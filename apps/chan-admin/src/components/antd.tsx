import { Typography, Form as AForm } from 'antd'
import Divider from './divider'

const { Item, List } = AForm
const { Title: ATitle, Text } = Typography

function Title({ className = '', ...props }) {
  return <ATitle {...props} className={`mb-0 ${className}`} />
}

function InlineItem({ className = '', labelWidth = 56, ...props }) {
  return (
    <Item
      {...props}
      label={
        <div
          className={'flex justify-end flex-shrink-0'}
          style={{ width: labelWidth }}
        >
          {props.label}
        </div>
      }
      className={`inline-block ${className}`}
    />
  )
}

function Form({ children, ...props }) {
  return (
    <AForm {...props} colon={false}>
      {children}
    </AForm>
  )
}

export { Text, Title, InlineItem, Item, List, Form }
