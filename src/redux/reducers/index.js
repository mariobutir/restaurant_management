import { combineReducers } from "redux"
import overview from "./overview"

const reducers = () =>
  combineReducers({
    overview,
  })

export default reducers
