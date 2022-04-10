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
    const handleSave = () => {
      form.submit()
      overlay.hide()
    }
    return (
      <div className="overlay-footer d-flex w-100 justify-content-between align-center">
        <div className="overlay-title">
          Add new report on: <b>{moment(date).format("dddd, MMMM Do YYYY")}</b>
        </div>
        <div className="d-flex">
          <div className="me-3">
            <Button className="me-2" onClick={handleDiscard}>
              Discard
            </Button>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleOnFinish = (values) => {
    console.log(values)
  }

  const handleValueChange = (changedValues, currentValues) => {
    console.log("changed value:", changedValues)
  }

  return (
    <Overlay className="add-report-overlay" overlay={overlay} header={false}>
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleOnFinish}
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
      </Form>
      <OverlayFooter />
    </Overlay>
  )
}

export default CreateReportOverlay
