import { Modal, Button, Form, Input, InputNumber, Space } from "antd"
import { useEffect, useState } from "react"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import actions from "../../redux/actions"

const VendorFormModal = (props) => {
  const { vendor_id } = props
  const vendors = useSelector((state) => state.vendors.data)
  const [visible, setVisible] = useState(false)
  const [initialFormState, setInitialFormState] = useState({ contacts: [{}] })

  const dispatch = useDispatch()

  const [form] = Form.useForm()

  useEffect(() => {
    if (vendor_id) {
      setInitialFormState(vendors[vendor_id])
    }
  }, [])

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    form.submit()
  }

  const handleFinish = (data) => {
    dispatch({ type: actions.CREATE_VENDOR, payload: data })
    setVisible(false)
    form.resetFields()
    dispatch({ type: actions.FETCH_VENDORS })
  }

  const handleFinishFailed = () => {
    console.log("finish failed")
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Button className="mb-4" type="primary" onClick={showModal}>
        {vendor_id ? "Edit" : "Create new vendor"}
      </Button>
      <Modal
        title={vendor_id ? "Edit vendor" : "Create new vendor"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Form
          form={form}
          labelCol={{
            span: 3,
          }}
          layout="horizontal"
          initialValues={initialFormState}
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
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
          <Form.Item
            label="GST number"
            name={["gst"]}
            rules={[
              {
                required: true,
                message: "GST number is required",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Lead time"
            name={["lead_time"]}
            rules={[
              {
                required: true,
                message: "Lead time is required",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Terms"
            name={["payment_terms"]}
            rules={[
              {
                required: true,
                message: "Payment terms are required",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <p>Contacts: </p>
          <Form.List name="contacts">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      name={[field.name, "name"]}
                      rules={[
                        {
                          required: true,
                          message: "Contact name is required",
                        },
                      ]}
                    >
                      <Input placeholder="Contact name" />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "number"]}
                      rules={[
                        {
                          required: true,
                          message: "Contact number is required",
                        },
                      ]}
                    >
                      <Input placeholder="Contact number" />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "email"]}
                      rules={[
                        {
                          required: true,
                          message: "Contact email is required",
                        },
                      ]}
                    >
                      <Input placeholder="Contact email" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add contact
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  )
}

export default VendorFormModal
