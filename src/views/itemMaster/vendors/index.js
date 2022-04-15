import { Button, Modal, Space, Table } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "../../../redux/actions"

const VendorsTable = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const { data, loading } = useSelector(state => state.vendors)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: actions.FETCH_VENDORS })
  }, [])

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true)
  }

  const handleOkDelete = () => {
    setIsDeleteModalVisible(false)
  }

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false)
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => text,
      width: "45%"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "20%"
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      width: "20%"
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <div className="d-flex">
            <Button danger className="me-2" onClick={showDeleteModal}>
              Delete
            </Button>
            <Button className="me-2" type="primary">
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
        <p>Are you sure you want to delete vendor?</p>
      </Modal>
      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  )
}

export default VendorsTable
