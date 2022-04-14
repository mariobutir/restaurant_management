import React from "react"
import { useNavigate } from "react-router"
import { CalendarOutlined, ShopOutlined } from "@ant-design/icons"

const menu = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate()

  const menuItems = [
    {
      key: "overview",
      element: "Overview",
      icon: <CalendarOutlined />,
      onClick: () => navigate("/overview"),
    },
    {
      key: "items",
      element: "Item Master",
      icon: <ShopOutlined />,
      onClick: () => navigate("/items"),
    },
  ]

  return { menuItems }
}

export default menu
