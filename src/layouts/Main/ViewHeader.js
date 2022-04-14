import React from 'react'
import { Layout } from 'antd'

const { Header } = Layout

const ViewHeader = props => {
  const { className = '', children } = props
  return <Header className={`main__header ${className}`}>{children}</Header>
}

export default ViewHeader
