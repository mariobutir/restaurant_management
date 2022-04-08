import moment from "moment"
import { Button, Card } from "antd"

import "./styles.scss"
import { EditOutlined, FileTextOutlined, PlusOutlined } from "@ant-design/icons"

const DayEntry = (props) => {
  const { entry } = props
  const selected = false

  const handleCardClick = () => {
    console.log(entry)
  }

  const date = moment(entry)
  const today = new Date()
  const isToday = date.isSame(today, "day")

  let actions = []
  const cardDetails = () => {
    if (date.isBefore(today, "day")) {
      actions = [
        <FileTextOutlined key="details" />,
        <EditOutlined key="edit" />,
      ]
      return (
        <Card className="date-card" onClick={handleCardClick} actions={actions}>
          <div className="report-details">
            Expenses: 100
            <br />
            Balance: 100
            <br />
          </div>
        </Card>
      )
    } else {
      actions = [<PlusOutlined key="add-report" />]
      return (
        <Card
          className="date-card"
          onClick={handleCardClick}
          actions={actions}
        />
      )
    }
  }
  return (
    <div className="day-entry">
      <div className="cell-date">
        <span className={`date ${isToday ? "today" : ""}`}>
          {date.format("D")}
        </span>
      </div>
      <div className={`date-card-wrapper ${selected ? "selected" : ""}`}>
        <Card className="date-card" onClick={handleCardClick} actions={actions}>
          {cardDetails()}
        </Card>
      </div>
    </div>
  )
}

export default DayEntry
