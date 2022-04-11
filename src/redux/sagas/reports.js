import { all, takeEvery, put } from "redux-saga/effects"
import actions from "../actions"

const { SET_REPORT_STATE: SET_STATE } = actions

export function* FETCH_REPORT_FORM_DATA() {
  yield put({ type: SET_STATE, payload: { loading: true } })
  console.log("report data")
  yield put({ type: SET_STATE, payload: { loading: false } })
}

export function* SET_REPORT_DATE({ payload }) {
  const { date } = payload
  console.log("report date", payload)
  yield put({ type: SET_STATE, payload: { date: date } })
}

export function* FETCH_REPORTS({ payload }) {
  const { date } = payload
  const details = {
    "05.04.2022": {
      vendors: [
        {
          products: [
            {
              product_id: "1",
              quantity: "5",
              rate: "1",
              tax: "1",
            },
            {
              product_id: "2",
              quantity: "5",
              rate: "22",
              tax: "1",
            },
          ],
          vendor_id: "1",
          invoice_number: "1",
        },
        {
          products: [
            {
              product_id: "2",
              quantity: "5",
              rate: "82",
              tax: "1",
            },
          ],
          vendor_id: "2",
          invoice_number: "2",
        },
      ],
    },
    "10.04.2022": {
      vendors: [
        {
          products: [
            {
              product_id: "1",
              quantity: "12",
              rate: "13",
              tax: "1",
            },
            {
              product_id: "2",
              quantity: "3",
              rate: "8",
              tax: "1",
            },
          ],
          vendor_id: "1",
          invoice_number: "1",
        },
        {
          products: [
            {
              product_id: "2",
              quantity: "1",
              rate: "2",
              tax: "1",
            },
          ],
          vendor_id: "2",
          invoice_number: "2",
        },
      ],
    },
  }
  console.log("report date and details", date, details)
  yield put({ type: SET_STATE, payload: { date: date, details: details } })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.FETCH_REPORT_FORM_DATA, FETCH_REPORT_FORM_DATA),
    takeEvery(actions.SET_REPORT_DATE, SET_REPORT_DATE),
    takeEvery(actions.FETCH_REPORTS, FETCH_REPORTS),
  ])
}
