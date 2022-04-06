import { useDispatch, useSelector } from "react-redux"
import actions from "./redux/actions"

const App = () => {
  const dispatch = useDispatch()
  const test = useSelector((store) => store.overview.test)

  const changeState = () => {
    console.log("clicked!")
    dispatch({ type: actions.FETCH_OVERVIEW })
  }

  return (
    <>
      <p>{test}</p>
      <button onClick={changeState}>Hello!</button>
    </>
  )
}

export default App
