import { all } from "redux-saga/effects"
import overview from "./overview"
import reports from "./reports"
import vendors from "./vendors"
import products from "./products"

export default function* rootSaga() {
  yield all([overview(), reports(), vendors(), products()])
}
