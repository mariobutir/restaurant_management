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

export function* UPDATE_VENDOR({ payload }) {
  const { id, data } = payload
  yield call(VendorService.updateVendor, id, data)
}

export function* DELETE_VENDOR({ payload }) {
  const { id } = payload
  yield call(VendorService.deleteVendor, id)
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.FETCH_VENDORS, FETCH_VENDORS),
    takeEvery(actions.CREATE_VENDOR, CREATE_VENDOR),
    takeEvery(actions.UPDATE_VENDOR, UPDATE_VENDOR),
    takeEvery(actions.DELETE_VENDOR, DELETE_VENDOR),
  ])
}
