import { all } from "redux-saga/effects"
import overview from "./overview"
import reports from "./reports"

export default function* rootSaga() {
  yield all([overview(), reports()])
}
