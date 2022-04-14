import React from 'react'
import { useNavigate } from 'react-router'
import { CalendarOutlined } from "@ant-design/icons"

const menu = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate()

  const menuItems = [
    {
      key: 'overview',
      element: 'Overview',
      icon: <CalendarOutlined />,
      onClick: () => navigate('/overview'),
    }
  ]

  return { menuItems }
}

export default menu
