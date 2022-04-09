import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import './styles.scss'

const Overlay = props => {
  const { className = '', overlay, children, loading = false, dark = false, header = <div />, style = {} } = props
  const { visible } = overlay

  const [pushBack, setPushBack] = useState(true)

  useEffect(() => {
    if (!visible) {
      setTimeout(() => setPushBack(true), 300)
      document.removeEventListener('keydown', handleKeyPress, false)
    } else {
      setPushBack(false)
      document.addEventListener('keydown', handleKeyPress, false)
    }
    return () => document.removeEventListener('keydown', handleKeyPress, false)
  }, [visible])

  const handleKeyPress = event => {
    // ESC
    if (event.keyCode === 27) {
      overlay.hide()
    }
  }

  return (
    <div
      className={`fullscreen-overlay ${className} ${visible ? 'visible' : 'hidden'} ${dark ? 'dark' : 'light'} ${
        !header ? 'no-header' : ''
      }`}
      style={pushBack ? { zIndex: -1, ...style } : style}
    >
      {!pushBack && (
        <Spin spinning={loading} delay={100}>
          <div className="fullscreen-overlay-header">{header || ''}</div>
          <div className="fullscreen-overlay-body">{children}</div>
        </Spin>
      )}
    </div>
  )
}

export default Overlay
