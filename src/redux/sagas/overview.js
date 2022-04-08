import { all, takeEvery, takeLatest, put, delay } from "redux-saga/effects"
import actions from "../actions"
import storeSelector from "../selectors"

const { SET_OVERVIEW_STATE: SET_STATE } = actions

export function* FETCH_OVERVIEW() {
  let test = storeSelector((store) => store.overview.test)
  yield put({ type: SET_STATE, payload: { test: test + 1 } })
}

export function* FILTER_OVERVIEW({ payload }) {
  yield put({ type: SET_STATE, payload: { loading: true } })
  yield delay(100)
  let filters = storeSelector((store) => store.overview.filters)
  filters = { ...filters, ...payload }
  yield put({
    type: SET_STATE,
    payload: { filters },
  })
  yield put({ type: SET_STATE, payload: { loading: false } })
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.FETCH_OVERVIEW, FETCH_OVERVIEW),
    takeEvery(actions.FILTER_OVERVIEW, FILTER_OVERVIEW),
  ])
}
