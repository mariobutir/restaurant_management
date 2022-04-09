import moment from "moment"
import { Card } from "antd"

import "./styles.scss"
import { EditOutlined, FileTextOutlined, PlusOutlined } from "@ant-design/icons"

const DayEntry = (props) => {
  const { entry, overlay } = props
  const selected = false

  const handleEditClick = () => {
    console.log(entry)
  }

  const handleDetailsClick = () => {
    console.log(entry)
  }

  const handlePlusClick = () => {
    overlay.show()
    console.log(entry)
  }

  const date = moment(entry)
  const today = new Date()
  const isToday = date.isSame(today, "day")

  let actions = []
  const cardDetails = () => {
    if (date.isBefore(today, "day")) {
      actions = [
        <FileTextOutlined key="details" onClick={handleDetailsClick} />,
        <EditOutlined key="edit" onClick={handleEditClick} />,
      ]
      return (
        <Card className="date-card" actions={actions}>
          <div className="report-details">
            Expenses: 100
            <br />
            Balance: 100
            <br />
          </div>
        </Card>
      )
    } else {
      actions = [<PlusOutlined key="add-report" onClick={handlePlusClick} />]
      return <Card className="date-card" actions={actions} />
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
        <Card className="date-card" actions={actions}>
          {cardDetails()}
        </Card>
      </div>
    </div>
  )
}

export default DayEntry
