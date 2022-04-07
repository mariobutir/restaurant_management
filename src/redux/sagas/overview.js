import { all, takeEvery, takeLatest, put } from "redux-saga/effects"
import actions from "../actions"
import storeSelector from "../selectors"

const { SET_OVERVIEW_STATE: SET_STATE } = actions

export function* FETCH_OVERVIEW() {
  let test = storeSelector((store) => store.overview.test)
  yield put({ type: SET_STATE, payload: { test: test + 1 } })
}

export function* FILTER_OVERVIEW({ payload }) {
  let filters = storeSelector((store) => store.overview.filters)
  filters = { ...filters, ...payload }
  yield put({
    type: SET_STATE,
    payload: { filters },
  })
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.FETCH_OVERVIEW, FETCH_OVERVIEW),
    takeEvery(actions.FILTER_OVERVIEW, FILTER_OVERVIEW),
  ])
}
