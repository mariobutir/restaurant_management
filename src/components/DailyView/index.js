import { Col, Row } from "antd"

import "./styles.scss"
import moment from "moment"
import { useSelector } from "react-redux"
import { calculateDailyData } from "../../views/overview/utils"
import DayEntry from "./DayEntry"
import { isEmpty } from "lodash"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const generateDaysArray = (dateString) => {
  const startOfMonth = moment(dateString).startOf("month").format("YYYY-MM-DD")
  const endOfMonth = moment(dateString).endOf("month").format("YYYY-MM-DD")

  const dates = new Set()
  const dateMove = new Date(startOfMonth)
  let strDate = startOfMonth

  while (strDate < endOfMonth) {
    strDate = dateMove.toISOString().slice(0, 10)
    dates.add(strDate)
    dateMove.setDate(dateMove.getDate() + 1)
  }

  return dates
}

const DailyView = (props) => {
  const {
    filters: { date },
  } = useSelector((store) => store.overview)

  const reports = useSelector((store) => store.reports.details)

  const calendar = calculateDailyData(generateDaysArray(date))

  return (
    <div className="main-container daily-view">
      <Row className="days-row">
        {days.map((day) => (
          <Col className={day} key={day}>
            {day}
          </Col>
        ))}
      </Row>
      {calendar.map((row) => (
        <Row key={row.hash()} className="overview-row">
          {row.map((entry) => (
            <Col key={entry + Math.random()}>
              {!isEmpty(entry) && (
                <DayEntry
                  entry={entry}
                  details={reports[entry] || {}}
                  {...props}
                />
              )}
            </Col>
          ))}
        </Row>
      ))}
    </div>
  )
}

export default DailyView
