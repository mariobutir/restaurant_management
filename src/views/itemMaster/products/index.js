import { Button, Modal, Space, Table } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "../../../redux/actions"

const ProductsTable = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isFormModalVisible, setIsFormModalVisible] = useState(false)
  const { data, loading } = useSelector(state => state.products)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: actions.FETCH_PRODUCTS })
  }, [])

  const showDeleteModal = (text) => {
    console.log("text", text)
    setIsDeleteModalVisible(true)
  }

  const handleOkDelete = () => {
    setIsDeleteModalVisible(false)
  }

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false)
  }

  const showEditModal = () => {
    setIsFormModalVisible(true)
  }

  const handleOkEdit = () => {
    setIsFormModalVisible(false)
  }

  const handleCancelEdit = () => {
    setIsFormModalVisible(false)
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "45%",
      render: (text) => text
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      width: "20%"
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
      width: "20%"
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <div className="d-flex">
            <Button danger className="me-2" onClick={() => showDeleteModal(text)}>
              Delete
            </Button>
            <Button className="me-2" type="primary" onClick={showEditModal}>
              Edit
            </Button>
          </div>
        </Space>
      )
    }
  ]

  return (
    <>
      <Modal
        visible={isDeleteModalVisible}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        footer={[
          <Button key="back" onClick={handleCancelDelete}>
            Cancel
          </Button>,
          <Button danger key="submit" onClick={handleOkDelete}>
            Delete
          </Button>
        ]}
      >
        <p>Are you sure you want to delete product?</p>
      </Modal>
      <Modal
        title="Edit product"
        visible={isFormModalVisible}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        footer={[
          <Button key="back" onClick={handleCancelEdit}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOkEdit}>
            Submit
          </Button>
        ]}
      >
        <p>Are you sure you want to delete product?</p>
      </Modal>
      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  )
}

export default ProductsTable
