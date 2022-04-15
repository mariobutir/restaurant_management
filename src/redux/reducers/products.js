import actions from "../actions"

const initialState = {
  loading: false,
  data: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_PRODUCT_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
