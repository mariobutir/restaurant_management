import moment from "moment"
import { Card } from "antd"

import "./styles.scss"
import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import formatter from "../../../utils"
import { useDispatch } from "react-redux"
import actions from "../../../redux/actions"

const DayEntry = (props) => {
  const { entry, details, overlay } = props
  const dateString = moment(entry).format("DD.MM.YYYY")

  const dispatch = useDispatch()

  const selected = false

  const handleEditClick = () => {
    dispatch({ type: actions.SET_REPORT_DATE, payload: { date: dateString } })
    overlay.show()
  }

  const handlePlusClick = () => {
    dispatch({ type: actions.SET_REPORT_DATE, payload: { date: dateString } })
    overlay.show()
  }

  const date = moment(entry)
  const today = new Date()
  const isToday = date.isSame(today, "day")

  let card_actions = []
  const cardDetails = () => {
    let totalVendors = 0
    let totalProducts = 0
    let totalCost = 0
    if (Object.keys(details).length !== 0) {
      totalVendors = details.vendors.length
      details.vendors.forEach((vendor) => {
        totalProducts += 1
        vendor.products.forEach((product) => {
          totalCost += product.quantity * product.rate
        })
      })
      card_actions = [<EditOutlined key="edit" onClick={handleEditClick} />]
      return (
        <Card className="date-card" actions={card_actions}>
          <div className="report-details">
            Vendors: {totalVendors}
            <br />
            Products: {totalProducts}
            <br />
            Spent: {formatter.format(totalCost)}
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
