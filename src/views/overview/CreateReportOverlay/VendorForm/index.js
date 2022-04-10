import { Button, Form, Input, Select } from "antd"
import { ProductsArray } from "../enums"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import React from "react"

const VendorForm = (props) => {
  const { fieldKey } = props

  return (
    <Form.Item className="product-entry-wrapper">
      <Form.List name={[fieldKey, "products"]} initialValue={[{}]}>
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
                        rules={[
                          {
                            required: true,
                            message: "Choosing a product is required",
                          },
                        ]}
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
                        rules={[
                          {
                            required: true,
                            message: "Quantity is required",
                          },
                        ]}
                      >
                        <Input placeholder="Quantity" style={{ width: 150 }} />
                      </Form.Item>
                      <Form.Item
                        className="me-2"
                        {...restField}
                        name={[name, "rate"]}
                        rules={[
                          {
                            required: true,
                            message: "Rate is required",
                          },
                        ]}
                      >
                        <Input placeholder="Rate" style={{ width: 150 }} />
                      </Form.Item>
                      <Form.Item
                        className="me-2"
                        {...restField}
                        name={[name, "tax"]}
                        rules={[
                          {
                            required: true,
                            message: "Tax is required",
                          },
                        ]}
                      >
                        <Input placeholder="Tax" style={{ width: 150 }} />
                      </Form.Item>
                    </div>
                    <div className="d-flex">
                      <Form.Item
                        className="me-2 total"
                        label={<i>Item total</i>}
                        {...restField}
                        name={[name, "total"]}
                        initialValue={10000}
                      >
                        <Input
                          placeholder="Total"
                          disabled={true}
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
  )
}

export default VendorForm
