import { Table, Space, Button, Modal } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "../../../redux/actions"

const ProductsTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { data, loading } = useSelector(state => state.products)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: actions.FETCH_PRODUCTS })
  }, [])

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
      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  )
}

export default ProductsTable
