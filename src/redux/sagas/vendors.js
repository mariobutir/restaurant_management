import { all, put, call, takeEvery } from "redux-saga/effects"
import actions from "../actions"
import VendorService from "../../services/vendors"

const { SET_VENDOR_STATE: SET_STATE } = actions

export function* FETCH_VENDORS() {
  yield put({ type: SET_STATE, payload: { loading: true } })
  const response = yield call(VendorService.getVendors)
  yield put({ type: SET_STATE, payload: { data: response, loading: false } })
}

export function* CREATE_VENDOR({ payload }) {
  yield call(VendorService.createVendor, payload)
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.FETCH_VENDORS, FETCH_VENDORS),
    takeEvery(actions.CREATE_VENDOR, CREATE_VENDOR),
  ])
}
