import React from 'react'
import { Layout } from 'antd'

import './styles.scss'

const { Footer } = Layout

const FormLayout = props => {
  const { children } = props
  return (
    <Layout>
      <Layout.Content className="form__layout">
        <div className="form__content">{children}</div>
      </Layout.Content>
      <Footer className="form__footer">Test © {new Date().getFullYear()}</Footer>
    </Layout>
  )
}

export default FormLayout
