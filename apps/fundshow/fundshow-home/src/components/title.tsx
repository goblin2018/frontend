import React from 'react'

interface Props {
  title: string
  theme?: 'light' | 'dark'
}

const Title: React.FC<Props> = ({ title, theme = 'light' }) => {
  return (
    <div>
      <div className={`mr-4  ${theme === 'light' ? 'text-black-disabled' : 'text-white-disabled'}  text-xl`}>
        FUNDSHOW
      </div>
      <div className={`${theme === 'light' ? 'text-text-black' : 'text-text-white'} text-4xl leading-normal`}>
        {title}
      </div>
    </div>
  )
}

export default Title
