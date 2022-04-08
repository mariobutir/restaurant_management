const CalendarRow = (length = 7) => {
  const row = Array.from({ length }, () => {
    return {}
  })
  row.hash = () => {
    return row.reduce((acc, curr) => curr + acc, 0)
  }
  return row
}

const calculateDailyData = (calculations) => {
  const calendar = []

  let row = CalendarRow()
  let dayOfWeek
  calculations.forEach((entry) => {
    const currentDate = new Date(entry)
    currentDate.setDate(currentDate.getDate() - 1)
    dayOfWeek = currentDate.getDay()
    row[dayOfWeek] = entry
    if (dayOfWeek === 6) {
      calendar.push(row)
      row = CalendarRow()
    }
  })
  if (dayOfWeek !== 6) calendar.push(row)

  return calendar
}

const calculateMonthlyData = (calculations) => {
  const calendar = []

  let row = CalendarRow(4)
  calculations.forEach((entry, index) => {
    row[index % 4] = entry
    if (index % 4 === 3) {
      calendar.push(row)
      row = CalendarRow(4)
    }
  })

  return calendar
}

export { calculateDailyData, calculateMonthlyData }
