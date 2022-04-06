import { useDispatch, useSelector } from "react-redux"
import actions from "./redux/actions"
import { Button, DatePicker } from "antd"

const App = () => {
  const dispatch = useDispatch()
  const test = useSelector((store) => store.overview.test)

  const changeState = () => {
    console.log("clicked!")
    dispatch({ type: actions.FETCH_OVERVIEW })
  }

  const onChange = (date, dateString) => {
    console.log(date, dateString)
  }

  return (
    <>
      <p>{test}</p>
      <Button type="primary" onClick={changeState}>
        Hello!
      </Button>
      <DatePicker onChange={onChange} picker="month" />
    </>
  )
}

export default App
