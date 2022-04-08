import React from 'react'
import moment from 'moment'
import { Card } from 'antd'

import './styles.scss'

const DayEntry = props => {
  const { entry } = props
  const selected = false

  const handleCardClick = () => {
    console.log("hi!")
  }

  const date = moment(entry.day)
  const isToday = date.isSame(new Date(), 'day')
  return (
    <div className="day-entry">
      <div className="cell-date">
        <span className={`date ${isToday ? 'today' : ''}`}>{date.format('D')}</span>
      </div>
      <div className={`date-card-wrapper ${selected ? 'selected' : ''}`}>
        <Card className="date-card" onClick={handleCardClick}>
          abc
        </Card>
      </div>
    </div>
  )
}

export default DayEntry
