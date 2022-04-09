import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Button, Card, Form } from "antd"
import "./styles.scss"
import Overlay from "../../../components/Overlay"
import actions from "../../../redux/actions"

import VendorForm from "./VendorForm"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { faTruck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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

  const handleOnFinish = (values) => {
    console.log("save report")
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
        <Form.Item className="product-entry-wrapper">
          <Form.List name="vendors" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Form.Item>
                    <Card
                      title={
                        <CardHeader
                          title="Vendor"
                          icon={faTruck}
                          remove={() => remove(field.name)}
                        />
                      }
                    >
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
