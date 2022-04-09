import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Button, Card, Form, Input, Select } from "antd"
import { ProductsArray } from "./enums"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTruck } from "@fortawesome/free-solid-svg-icons"
import "./styles.scss"
import Overlay from "../../../components/Overlay"
import actions from "../../../redux/actions"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 20 },
}

const CardHeader = (props) => {
  const { icon, title } = props
  return (
    <div className="fix">
      {icon && <FontAwesomeIcon className="me-2" icon={icon} />}
      {title}
    </div>
  )
}

const CreateReportOverlay = (props) => {
  const { overlay } = props

  const [form] = Form.useForm()

  const dispatch = useDispatch()

  useEffect(() => {
    if (overlay.visible) {
      dispatch({ type: actions.FETCH_REPORT_FORM_DATA })
    }
  }, [overlay.visible])

  const handleOnFinish = (values) => {
    console.log("save report")
  }

  const OverlayFooter = () => {
    const handleDiscard = () => {
      overlay.hide()
    }
    const handleSave = () => {
      form.submit()
      overlay.hide()
    }
    return (
      <div className="overlay-footer d-flex w-100 justify-content-between align-center">
        <div className="overlay-title">Add new report</div>
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

  const handleValueChange = (changedValues, currentValues) => {
    console.log("changed value")
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
        <Card title={<CardHeader title="Vendor" icon={faTruck} />}>
          <Form.Item className="product-entry-wrapper">
            <Form.List name="products" initialValue={[{}]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <div key={key} className="product-entry">
                      <div className="index-container">
                        <div className="numbering">{index + 1}.</div>
                      </div>
                      <div className="product-entry-section">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex">
                            <Form.Item
                              className="me-2"
                              {...restField}
                              name={[name, "product_id"]}
                            >
                              <Select
                                showSearch
                                placeholder="Select product"
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
                              {...restField}
                              name={[name, "quantity"]}
                            >
                              <Input
                                placeholder="Quantity"
                                style={{ width: 100 }}
                              />
                            </Form.Item>
                            <Form.Item
                              className="me-2"
                              {...restField}
                              name={[name, "rate"]}
                            >
                              <Input
                                placeholder="Rate"
                                style={{ width: 150 }}
                              />
                            </Form.Item>
                            <Form.Item
                              className="me-2"
                              {...restField}
                              name={[name, "tax"]}
                            >
                              <Input placeholder="Tax" style={{ width: 150 }} />
                            </Form.Item>
                          </div>
                          <div className="d-flex">
                            <Form.Item
                              className="me-2 total"
                              label="Total"
                              {...restField}
                              name={[name, "total"]}
                            >
                              <Input
                                placeholder="Total"
                                defaultValue="10000"
                                style={{
                                  border: 0,
                                }}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                      <div className="product-actions">
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </div>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add product
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Card>
      </Form>
      <OverlayFooter />
    </Overlay>
  )
}

export default CreateReportOverlay
