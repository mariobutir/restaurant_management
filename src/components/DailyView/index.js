import { Col, Row } from "antd"

import "./styles.scss"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const DailyView = (props) => {
  return (
    <div className="main-container daily-view">
      <Row className="days-row">
        {days.map((day) => (
          <Col key={day}>{day}</Col>
        ))}
      </Row>
    </div>
  )
}

export default DailyView
