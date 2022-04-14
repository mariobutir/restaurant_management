import { combineReducers } from "redux"
import overview from "./overview"
import reports from "./reports"
import vendors from "./vendors"
import session from "./session"
import navigator from "./navigator"

const reducers = () =>
  combineReducers({
    overview,
    reports,
    vendors,
    session,
    navigator
  })

export default reducers
