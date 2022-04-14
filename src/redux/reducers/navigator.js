import actions from "../actions"


const initialState = {
  path: undefined,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_NAVIGATOR_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
