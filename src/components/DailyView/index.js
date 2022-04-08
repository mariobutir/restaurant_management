import { Col, Row } from "antd"

import "./styles.scss"
import moment from "moment"
import { useSelector } from "react-redux"
import { calculateDailyData } from "../../views/overview/utils"
import DayEntry from "./DayEntry"
import {isEmpty} from "lodash"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const generateDaysArray = (dateString) => {
  const startOfMonth = moment(dateString).startOf("month").format("YYYY-MM-DD")
  const endOfMonth = moment(dateString).endOf("month").format("YYYY-MM-DD")

  const dates = []
  const dateMove = new Date(startOfMonth)
  let strDate = startOfMonth

  while (strDate < endOfMonth) {
    strDate = dateMove.toISOString().slice(0, 10)
    dates.push({'day': strDate})
    dateMove.setDate(dateMove.getDate() + 1)
  }

  return dates
}

const DailyView = (props) => {
  const { filters: { date } } = useSelector((store) => store.overview)

  const calendar = calculateDailyData(generateDaysArray(date))
  console.log(calendar)

  return (
    <div className="main-container daily-view">
      <Row className="days-row">
        {days.map((day) => (
          <Col key={day}>{day}</Col>
        ))}
      </Row>
      {calendar.map(row => (
        <Row key={row.hash()} className="overview-row">
          {row.map(entry => (
            <Col key={entry.day || Math.random()}>
              {!isEmpty(entry) && <DayEntry entry={entry} {...props} />}
            </Col>
          ))}
        </Row>
      ))}
    </div>
  )
}

export default DailyView
