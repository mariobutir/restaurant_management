import { all, put, takeEvery } from "redux-saga/effects"
import actions from "../actions"

const { SET_REPORT_STATE: SET_STATE } = actions

export function* FETCH_VENDORS() {
  yield put({ type: SET_STATE, payload: { loading: true } })
  console.log("vendor data")
  yield put({ type: SET_STATE, payload: { loading: false } })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.FETCH_VENDORS, FETCH_VENDORS)
  ])
}
