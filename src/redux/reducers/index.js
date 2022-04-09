import { combineReducers } from "redux"
import overview from "./overview"
import reports from "./reports"

const reducers = () =>
  combineReducers({
    overview,
    reports,
  })

export default reducers
