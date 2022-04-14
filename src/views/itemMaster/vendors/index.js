import { Table, Space, Button, Modal } from "antd"
import React, { useState } from "react"

const Vendors = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => text,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <div className="d-flex">
            <Button danger className="me-2" onClick={showModal}>
              Delete
            </Button>
            <Button className="me-2" type="primary">
              Edit
            </Button>
          </div>
        </Space>
      ),
    },
  ]

  const data = [
    {
      key: "1",
      name: "Vendor 1",
      address: "New York No. 1 Lake Park",
      contact: "+123 456 789",
    },
    {
      key: "2",
      name: "Vendor 2",
      address: "London No. 1 Lake Park",
      contact: "+123 456 789",
    },
    {
      key: "3",
      name: "Vendor 3",
      address: "Sidney No. 1 Lake Park",
      contact: "+123 456 789",
    },
  ]

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete vendor?</p>
      </Modal>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default Vendors
