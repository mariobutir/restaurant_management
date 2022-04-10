import moment from "moment"
import { Card } from "antd"

import "./styles.scss"
import { EditOutlined, FileTextOutlined, PlusOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import actions from "../../../redux/actions"

const DayEntry = (props) => {
  const { entry, overlay } = props

  const dispatch = useDispatch()

  const updateSelectedDate = () => {
    dispatch({
      type: actions.SET_REPORT_DATE,
      payload: entry,
    })
  }

  const selected = false

  const handleEditClick = () => {
    console.log(entry)
  }

  const handleDetailsClick = () => {
    console.log(entry)
  }

  const handlePlusClick = () => {
    updateSelectedDate(entry)
    overlay.show()
  }

  const date = moment(entry)
  const today = new Date()
  const isToday = date.isSame(today, "day")

  let card_actions = []
  const cardDetails = () => {
    if (date.isBefore(today, "day")) {
      card_actions = [
        <FileTextOutlined key="details" onClick={handleDetailsClick} />,
        <EditOutlined key="edit" onClick={handleEditClick} />,
      ]
      return (
        <Card className="date-card" actions={card_actions}>
          <div className="report-details">
            Expenses: 100
            <br />
            Balance: 100
            <br />
          </div>
        </Card>
      )
    } else {
      card_actions = [
        <PlusOutlined key="add-report" onClick={handlePlusClick} />,
      ]
      return <Card className="date-card" actions={card_actions} />
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
        <Card className="date-card" actions={card_actions}>
          {cardDetails()}
        </Card>
      </div>
    </div>
  )
}

export default DayEntry
