import { useState } from "react"
import { Card } from "antd"
import "./styles.scss"
import Vendors from "./vendors"

const tabList = [
  {
    key: "vendors",
    tab: "Vendors",
  },
  {
    key: "products",
    tab: "Products",
  },
]

const contentList = {
  vendors: <Vendors />,
  products: <p>product test</p>,
}

const ItemMaster = () => {
  const [activeTabKey, setActiveTabKey] = useState("vendors")

  const onTabChange = (key) => {
    setActiveTabKey(key)
  }

  return (
    <div className="item-master-container">
      <Card
        style={{ width: "100%" }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={(key) => {
          onTabChange(key)
        }}
      >
        {contentList[activeTabKey]}
      </Card>
    </div>
  )
}

export default ItemMaster
