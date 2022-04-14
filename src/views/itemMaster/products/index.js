import { Table, Space, Button, Modal } from "antd"
import React, { useState } from "react"

const ProductsTable = () => {
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
      width: "45%",
      render: (text) => text,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      width: "20%",
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
      width: "20%",
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
      name: "Product 1",
      rate: 10,
      tax: 5,
    },
    {
      key: "2",
      name: "Product 2",
      rate: 5,
      tax: 3,
    },
    {
      key: "3",
      name: "Product 3",
      rate: 8,
      tax: 12,
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
        <p>Are you sure you want to delete product?</p>
      </Modal>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default ProductsTable
