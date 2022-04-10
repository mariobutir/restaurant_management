import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Card, Form, Input, Select } from "antd"
import "./styles.scss"
import Overlay from "../../../components/Overlay"
import actions from "../../../redux/actions"

import VendorForm from "./VendorForm"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { faTruck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ProductsArray } from "./enums"
import moment from "moment"

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 20 },
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

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

  const { date } = useSelector((store) => store.reports)

  const [form] = Form.useForm()

  const dispatch = useDispatch()

  useEffect(() => {
    if (overlay.visible) {
      dispatch({ type: actions.FETCH_REPORT_FORM_DATA })
    }
  }, [overlay.visible])

  const OverlayFooter = () => {
    const handleDiscard = () => {
      overlay.hide()
      form.resetFields()
      form.setFieldsValue({ vendors: [{}] })
    }

    return (
      <div className="overlay-footer d-flex w-100 justify-content-between align-center">
        <div className="overlay-title">
          Add new report on: <b>{moment(date).format("dddd, MMMM Do YYYY")}</b>
        </div>
        <div className="d-flex">
          <Button className="me-2" onClick={handleDiscard}>
            Discard
          </Button>
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
    console.log("submitted")
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
    if ("products" in vendors[vendorIndex]) {
      const { products } = vendors[vendorIndex]
      const productIndex = products.length - 1
      if (
        "rate" in products[productIndex] ||
        "quantity" in products[productIndex]
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
        {...layout}
      >
        <Form.Item className="product-entry-wrapper">
          <Form.List name="vendors" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Form.Item key={field.key}>
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
                            {ProductsArray.map((product) => (
                              <Select.Option
                                key={product.id}
                                value={product.name}
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
