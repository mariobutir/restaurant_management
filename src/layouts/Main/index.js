import React from 'react'
import { Layout } from 'antd'
import Sidebar from './Sidebar'

import './styles.scss'

const MainLayout = props => {
  const { children } = props
  return (
    <Layout className="main__layout">
      <Sidebar className="main__sidebar" />
      <Layout>{children}</Layout>
    </Layout>
  )
}

export default MainLayout
