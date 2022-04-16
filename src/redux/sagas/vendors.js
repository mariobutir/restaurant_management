import { all, delay, put, takeEvery } from "redux-saga/effects"
import actions from "../actions"

const { SET_VENDOR_STATE: SET_STATE } = actions

export function* FETCH_VENDORS() {
  yield put({ type: SET_STATE, payload: { loading: true } })
  yield delay(500)

  let response = {
    1: {
      id: 1,
      name: "Vendor 1",
      address: "New York No. 1 Lake Park",
      gst_number: 10,
      payment_terms: "test",
      lead_time: 10,
      contacts: [
        {
          name: "Mario",
          number: "+123 456 789",
          email: "test@test.com",
        },
      ],
    },
    2: {
      id: 2,
      name: "Vendor 2",
      address: "London No. 1 Lake Park",
      gst_number: 10,
      payment_terms: "test",
      lead_time: 10,
      contacts: [
        {
          name: "Mario",
          number: "+123 456 789",
          email: "test@test.com",
        },
        {
          name: "Ante",
          number: "+123 456 789",
          email: "test@test.com",
        },
      ],
    },
  }

  yield put({ type: SET_STATE, payload: { data: response } })
  yield put({ type: SET_STATE, payload: { loading: false } })
}

export default function* rootSaga() {
  yield all([takeEvery(actions.FETCH_VENDORS, FETCH_VENDORS)])
}
