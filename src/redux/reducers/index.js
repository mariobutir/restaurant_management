import { combineReducers } from "redux"
import overview from "./overview"
import reports from "./reports"
import vendors from "./vendors"

const reducers = () =>
  combineReducers({
    overview,
    reports,
    vendors
  })

export default reducers
