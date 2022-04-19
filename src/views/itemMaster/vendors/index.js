import { Button, Modal, Space, Table } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "../../../redux/actions"
import VendorFormModal from "../../../components/VendorFormModal"

const VendorsTable = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const { data, loading } = useSelector((state) => state.vendors)
  const [vendorToDelete, setVendorToDelete] = useState(undefined)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: actions.FETCH_VENDORS })
  }, [])

  useEffect(() => {
    if (!isDeleteModalVisible) {
      dispatch({ type: actions.FETCH_VENDORS })
    }
  }, [isDeleteModalVisible])

  const showDeleteModal = (vendor_id) => {
    setVendorToDelete(vendor_id)
    setIsDeleteModalVisible(true)
  }

  const handleOkDelete = () => {
    dispatch({ type: actions.DELETE_VENDOR, payload: { id: vendorToDelete } })
    setIsDeleteModalVisible(false)
    setVendorToDelete(undefined)
  }

  const handleCancelDelete = () => {
    setVendorToDelete(undefined)
    setIsDeleteModalVisible(false)
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
      render: (text) => text,
    },
    {
      title: "GST number",
      dataIndex: "gst",
      key: "gst",
      render: (text) => text,
    },
    {
      title: "Lead time (days)",
      dataIndex: "lead_time",
      key: "lead_time",
      render: (text) => text,
    },
    {
      title: "Payment terms",
      dataIndex: "payment_terms",
      key: "payment_terms",
      render: (text) => text,
    },
    {
      title: "Contacts",
      dataIndex: "contacts",
      key: "contacts",
      render: (text, record) => (
        <div className="d-flex flex-column">
          {text.map((contact, index) => {
            return (
              <p key={index} className="m-0">
                {contact.name} | {contact.number} | {contact.email}
              </p>
            )
          })}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <Space size="middle">
          <div className="d-flex">
            <Button
              danger
              className="me-2"
              onClick={() => showDeleteModal(text.key)}
            >
              Delete
            </Button>
            <VendorFormModal vendor_id={text.key} />
          </div>
        </Space>
      ),
    },
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
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete vendor?</p>
      </Modal>
      <VendorFormModal />
      <Table
        loading={loading}
        columns={columns}
        dataSource={Object.values(data).map(({ id, ...rest }) => ({
          key: id,
          ...rest,
        }))}
      />
    </>
  )
}

export default VendorsTable
