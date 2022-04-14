import { Spin } from 'antd'
import React from 'react'

const Loader = () => {
  return (
    <Spin spinning>
      <div style={{ width: '100vw', height: '100vh' }} />
    </Spin>
  )
}

export default Loader
