import actions from "../actions"

const initialState = {
  loading: false,
  loadingFilters: false,
  date: "",
  details: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_REPORT_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
