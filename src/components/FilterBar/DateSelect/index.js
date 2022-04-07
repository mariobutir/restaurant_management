import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, DatePicker, Radio } from "antd"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft as leftIcon,
  faChevronRight as rightIcon,
} from "@fortawesome/free-solid-svg-icons"
import "./styles.scss"
import actions from "../../../redux/actions"
import enums from "../../../enums"

const NavigationButton = (props) => {
  const { icon, onClick } = props
  return (
    <Button
      onClick={onClick}
      type="primary"
      shape="circle"
      icon={<FontAwesomeIcon icon={icon} />}
    />
  )
}

const DateSelect = () => {
  const { date, type } = useSelector((store) => store.overview.filters)
  const dispatch = useDispatch()

  const updateFilter = (filter) => {
    dispatch({
      type: actions.FILTER_OVERVIEW,
      payload: filter,
    })
    dispatch({ type: actions.FETCH_OVERVIEW })
  }

  const handlePickerChange = (val) => {
    updateFilter({ date: val.toDate() })
  }

  const handleBackward = () => {
    const momentDate = moment(date)
    updateFilter({
      date: momentDate
        .add(-1, type === enums.IntervalType.Day ? "months" : "years")
        .toDate(),
    })
  }

  const handleForward = () => {
    const momentDate = moment(date)
    updateFilter({
      date: momentDate
        .add(1, type === enums.IntervalType.Day ? "months" : "years")
        .toDate(),
    })
  }

  const handleTypeChange = (event) => {
    const { value } = event.target
    updateFilter({ type: value })
  }

  return (
    <div className="date-select">
      <NavigationButton icon={leftIcon} onClick={handleBackward} />
      <DatePicker
        className="picker"
        allowClear={false}
        value={moment(date)}
        format={type === enums.IntervalType.Day ? "MMM YYYY" : "YYYY"}
        onChange={handlePickerChange}
        picker={type === enums.IntervalType.Day ? "month" : "year"}
        suffixIcon={null}
        bordered={false}
        inputReadOnly
        size="large"
      />
      <NavigationButton icon={rightIcon} onClick={handleForward} />
      <Radio.Group
        className="type-radio"
        value={type}
        buttonStyle="solid"
        onChange={handleTypeChange}
      >
        <Radio.Button value={enums.IntervalType.Day}>Daily</Radio.Button>
        <Radio.Button value={enums.IntervalType.Month}>Monthly</Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default DateSelect
