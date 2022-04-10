import { all, takeEvery, put } from "redux-saga/effects"
import actions from "../actions"

const { SET_REPORT_STATE: SET_STATE } = actions

export function* FETCH_REPORT_FORM_DATA() {
  yield put({ type: SET_STATE, payload: { loading: true } })
  console.log("report data")
  yield put({ type: SET_STATE, payload: { loading: false } })
}

export function* SET_REPORT_DATE({ payload }) {
  console.log("report date: ", payload)
  yield put({ type: SET_STATE, payload: { date: payload } })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.FETCH_REPORT_FORM_DATA, FETCH_REPORT_FORM_DATA),
    takeEvery(actions.SET_REPORT_DATE, SET_REPORT_DATE),
  ])
}
