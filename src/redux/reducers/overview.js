import actions from "../actions"

const initialState = {
  test: 0,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_OVERVIEW_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
