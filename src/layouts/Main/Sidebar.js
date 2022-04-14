import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import menu from './menu'
import useModal from "../../hooks/useModal"
import { PieChartOutlined } from "@ant-design/icons"

const { Sider } = Layout

function useOutsideAlerter(ref, callback = () => {}) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

const Sidebar = props => {
  const { className = '' } = props
  const wrapperRef = useRef(null)

  const { menuItems } = menu()

  const submenu = useModal()

  useOutsideAlerter(wrapperRef, () => {
    submenu.hide()
  })

  const handleItemClick = item => {
    if (item.submenu) submenu.show(item)
    else item.onClick()
  }

  const [selectedKey, setSelectedKey] = useState()

  const { pathname } = useLocation()
  useEffect(() => {
    try {
      const selected = pathname.split('/')[1]
      setSelectedKey(selected)
    } catch {
      // Error splitting pathname
    }
  }, [pathname])

  return (
    <>
      <Sider collapsed className={className}>
        <div className="logo">
          <PieChartOutlined style={{ fontSize: '26px', color: '#08c' }} />
        </div>
        <Menu theme="light" defaultSelectedKeys={'overview'} selectedKeys={selectedKey} mode="inline">
          {menuItems.map(item => (
            <Menu.Item key={item.key || item.element} icon={item.icon} onClick={() => handleItemClick(item)}>
              {item.element}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      {submenu.visible && (
        <Sider ref={wrapperRef} className="secondary__sidebar" collapsed={false}>
          <div className="submenu-title">{submenu.data.element}</div>
          <Menu mode="vertical">
            {submenu.data.submenu?.map(item =>
              item.isTitle ? (
                <div
                  key={item.key || item.element}
                  style={{ padding: 10, marginTop: 15, marginBottom: 8, fontWeight: 'bold' }}
                >
                  {item.element}
                </div>
              ) : (
                <Menu.Item
                  key={item.key || item.element}
                  icon={item.icon}
                  onClick={() => {
                    item.onClick()
                    submenu.hide()
                  }}
                >
                  {item.element}
                </Menu.Item>
              )
            )}
          </Menu>
        </Sider>
      )}
    </>
  )
}

export default Sidebar
