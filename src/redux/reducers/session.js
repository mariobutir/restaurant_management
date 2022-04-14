import actions from "../actions"

const initialState = {
  loading: false,
  authenticated: true,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_SESSION_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
