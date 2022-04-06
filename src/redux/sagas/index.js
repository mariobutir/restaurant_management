import { all } from 'redux-saga/effects'
import overview from './overview'

export default function* rootSaga() {
  yield all([overview()])
}
