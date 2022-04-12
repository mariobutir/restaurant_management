import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Button, Card, Form, Input, Select } from "antd"
import "./styles.scss"
import Overlay from "../../../components/Overlay"

import VendorForm from "./VendorForm"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { faTruck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { VendorsArray } from "./enums"
import moment from "moment"
import formatter from "../../../utils"

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 20 },
}

const CardHeader = (props) => {
  const { icon, title, remove } = props
  return (
    <div className="fix">
      {icon && <FontAwesomeIcon className="me-2" icon={icon} />}
      {title}
      <div className="product-actions vendor-remove">
        <MinusCircleOutlined onClick={() => remove()} />
      </div>
    </div>
  )
}

const CreateReportOverlay = (props) => {
  const { overlay } = props

  const { date, details } = useSelector((store) => store.reports)
  const initialFormValue = details[date] || {}
  const isEditMode = Object.keys(initialFormValue).length !== 0

  let [form] = Form.useForm()

  useEffect(() => {
    if (overlay.visible) {
      if (isEditMode) {
        initialFormValue.vendors.forEach((vendor) => {
          vendor.products.forEach((product) => {
            product["total"] = formatter.format(product.quantity * product.rate)
          })
        })
      }
      form.setFieldsValue(initialFormValue)
    }
  }, [overlay.visible])

  const OverlayFooter = () => {
    const handleDiscard = () => {
      overlay.hide()
      form.resetFields()
      form.setFieldsValue({})
    }

    const handleReset = () => {
      form.resetFields()
      form.setFieldsValue(initialFormValue)
    }

    return (
      <div className="overlay-footer d-flex w-100 justify-content-between align-center">
        <div className="overlay-title">
          {isEditMode ? "Edit " : "Add new "} report on:{" "}
          <b>{moment(date).format("dddd, MMMM Do YYYY")}</b>
        </div>
        <div className="d-flex">
          <Button danger className="me-2" onClick={handleDiscard}>
            Discard
          </Button>
          {isEditMode && (
            <Button className="me-2" onClick={handleReset}>
              Reset
            </Button>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </div>
      </div>
    )
  }

  const handleOnFinish = (values) => {
    console.log("submitted", values)
    overlay.hide()
    form.resetFields()
    form.setFieldsValue({ vendors: [{}] })
  }

  const handleOnFinishFailed = (values) => {
    console.log("failed")
  }

  const handleValueChange = (changedValues, currentValues) => {
    const { vendors } = changedValues
    const vendorIndex = vendors.length - 1
    if (
      vendors[vendorIndex] !== undefined &&
      "products" in vendors[vendorIndex]
    ) {
      const { products } = vendors[vendorIndex]
      const productIndex = products.length - 1
      if (
        products[productIndex] !== undefined &&
        ("rate" in products[productIndex] ||
          "quantity" in products[productIndex])
      ) {
        const changedProduct =
          currentValues.vendors[vendorIndex].products[productIndex]
        changedProduct.total = formatter.format(
          (changedProduct.rate || 0) * (changedProduct.quantity || 0)
        )
        form.setFieldsValue(currentValues)
      }
    }
  }

  return (
    <Overlay className="add-report-overlay" overlay={overlay} header={false}>
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleOnFinish}
        onFinishFailed={handleOnFinishFailed}
        onValuesChange={handleValueChange}
        initialValues={{}}
        {...layout}
      >
        <Form.Item className="product-entry-wrapper">
          <Form.List name="vendors">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Form.Item key={field.name}>
                    <Card
                      className="vendor-card"
                      title={
                        <CardHeader
                          title={<i>Vendor</i>}
                          icon={faTruck}
                          remove={() => remove(field.name)}
                        />
                      }
                    >
                      <div className="d-flex">
                        <Form.Item
                          className="me-2"
                          name={[field.name, "vendor_id"]}
                          rules={[
                            {
                              required: true,
                              message: "Choosing a vendor is required",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder="Select vendor"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            style={{ width: 250 }}
                          >
                            {VendorsArray.map((product) => (
                              <Select.Option
                                key={product.id}
                                value={product.id}
                              >
                                {product.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          className="me-2"
                          name={[field.name, "invoice_number"]}
                          rules={[
                            {
                              required: true,
                              message: "Invoice number is required",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Invoice number"
                            style={{ width: 250 }}
                          />
                        </Form.Item>
                      </div>
                      <VendorForm fieldKey={field.name} />
                    </Card>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    className="add-vendor-button"
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add vendor
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <OverlayFooter />
      </Form>
    </Overlay>
  )
}

export default CreateReportOverlay
