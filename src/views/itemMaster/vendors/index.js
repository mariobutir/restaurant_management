import { Table, Space, Button, Modal } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "../../../redux/actions"

const VendorsTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { data, loading } = useSelector(state => state.vendors)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: actions.FETCH_VENDORS })
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
      render: (text) => text,
      width: "45%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "20%",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
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
        <p>Are you sure you want to delete vendor?</p>
      </Modal>
      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  )
}

export default VendorsTable
