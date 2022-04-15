import { combineReducers } from "redux"
import overview from "./overview"
import reports from "./reports"
import vendors from "./vendors"
import products from "./products"
import session from "./session"
import navigator from "./navigator"

const reducers = () =>
  combineReducers({
    overview,
    reports,
    vendors,
    products,
    session,
    navigator
  })

export default reducers
