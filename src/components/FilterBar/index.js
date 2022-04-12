import DateSelect from "./DateSelect"
import { Button, Layout } from "antd"
import "./styles.scss"
import React from "react"
import { EditOutlined, PlusOutlined } from "@ant-design/icons"

const { Header } = Layout

const FilterBar = () => {
  return (
    <Header className="overview-header">
      <div className="overview-header-button-container">
        <Button ghost className="add-edit-vendor" icon={<PlusOutlined />}>
          Create vendors
        </Button>
        <Button ghost className="add-edit-vendor" icon={<EditOutlined />}>
          Edit vendors
        </Button>
      </div>
      <DateSelect />
      <div className="overview-header-button-container" />
    </Header>
  )
}

export default FilterBar
