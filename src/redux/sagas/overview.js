import { all, takeEvery, put } from "redux-saga/effects"
import actions from "../actions"

const { SET_OVERVIEW_STATE: SET_STATE } = actions

export function* FETCH_OVERVIEW() {
  yield put({ type: SET_STATE, payload: { test: 1 } })
}

export default function* rootSaga() {
  yield all([takeEvery(actions.FETCH_OVERVIEW, FETCH_OVERVIEW)])
}
