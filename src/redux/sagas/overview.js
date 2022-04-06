import { all, takeEvery, put } from 'redux-saga/effects'
import actions from "../actions";

const { SET_OVERVIEW_STATE: SET_STATE } = actions

export function* SET_OVERVIEW_STATE() {
  yield put({ type: SET_STATE, payload: { test: true } })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SET_OVERVIEW_STATE, SET_OVERVIEW_STATE),
  ])
}
