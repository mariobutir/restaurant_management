import actions from "../actions"

const initialState = {
  loading: false,
  details: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_VENDOR_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
