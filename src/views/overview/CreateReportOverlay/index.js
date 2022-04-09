import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Card, DatePicker, Form, Input, Row, Select, Button } from "antd"
import moment from "moment"
import { CurrenciesArray, ReportTypesArray } from "./enums"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBuilding,
  faHouse,
  faPercent,
} from "@fortawesome/free-solid-svg-icons"
import "./styles.scss"
import Overlay from "../../../components/Overlay"
import actions from "../../../redux/actions"

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
      // overlay.hide()
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

  const disabledEntry = false

  return (
    <Overlay className="add-report-overlay" overlay={overlay} header={false}>
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleOnFinish}
        onValuesChange={handleValueChange}
        {...layout}
      >
        <Row className="report-save-update-row">
          <Card
            title={<CardHeader title="General information" icon={faHouse} />}
          >
            <Form.Item
              name="key_account"
              label="Key Account"
              initialValue="Mario Butir"
            >
              <Input />
            </Form.Item>
            <Form.Item name="date" label="Date" initialValue={moment()}>
              <DatePicker format="DD.MM.YYYY" disabled />
            </Form.Item>
          </Card>
          <Card
            title={<CardHeader title="Seller information" icon={faBuilding} />}
          >
            <Form.Item name="currency" label="Currency">
              <Select disabled={disabledEntry}>
                {CurrenciesArray.map((item) => (
                  <Select.Option key={item.id}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Card>
          <Card title={<CardHeader title="Report details" icon={faPercent} />}>
            <Form.Item
              name="report_type"
              label="Report Type"
              initialValue={ReportTypesArray[0].id}
            >
              <Select>
                {ReportTypesArray.map((item) => (
                  <Select.Option key={item.id}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Card>
        </Row>
      </Form>
      <OverlayFooter />
    </Overlay>
  )
}

export default CreateReportOverlay
