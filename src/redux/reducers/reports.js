import actions from "../actions"

const initialState = {
  test: 0,
  loading: false,
  loadingFilters: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_REPORT_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
