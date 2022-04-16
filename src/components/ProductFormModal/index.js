import { Modal, Button } from "antd"
import { useState } from "react"

const ProductFormModal = () => {
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    console.log("Clicked cancel button")
    setVisible(false)
  }

  return (
    <>
      <Button className="mb-4" type="primary" onClick={showModal}>
        Add product
      </Button>
      <Modal
        title="Create new product"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Form</p>
      </Modal>
    </>
  )
}

export default ProductFormModal
