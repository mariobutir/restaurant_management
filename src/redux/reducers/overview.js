import actions from "../actions"
import enums from "../../enums"

const initialState = {
  test: 0,
  filters: {
    date: new Date(),
    type: enums.IntervalType.Day,
  },
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_OVERVIEW_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
