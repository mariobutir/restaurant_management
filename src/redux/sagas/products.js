import { all, delay, put, takeEvery } from "redux-saga/effects"
import actions from "../actions"

const { SET_PRODUCT_STATE: SET_STATE } = actions

export function* FETCH_PRODUCTS() {
  yield put({ type: SET_STATE, payload: { loading: true } })
  yield delay(500)

  let data = [
    {
      id: "1",
      name: "Product 1",
      rate: 10,
      tax: 5,
    },
    {
      id: "2",
      name: "Product 2",
      rate: 5,
      tax: 3,
    },
    {
      id: "3",
      name: "Product 3",
      rate: 8,
      tax: 12,
    },
  ]

  data = data.map(({ id, ...rest }) => ({ key: id, ...rest }))

  yield put({ type: SET_STATE, payload: { data: data } })
  yield put({ type: SET_STATE, payload: { loading: false } })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.FETCH_PRODUCTS, FETCH_PRODUCTS)
  ])
}
