import { Modal, Button, Form, Input } from "antd"
import { useState } from "react"

const VendorFormModal = () => {
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  let [form] = Form.useForm()

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    form.submit()
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
        Add vendor
      </Button>
      <Modal
        title="Create new vendor"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
      >
        <Form
          labelCol={{
            span: 3,
          }}
          layout="horizontal"
        >
          <Form.Item
            label="Name"
            name={["name"]}
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name={["address"]}
            rules={[
              {
                required: true,
                message: "Address is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default VendorFormModal
