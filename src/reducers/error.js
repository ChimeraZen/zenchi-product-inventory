// reducers/errorReducer.js
import { errorTypes } from 'actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch(action.type) {
    case errorTypes.GET_ERRORS:
      return action.payload
    default: 
      return state
  }
}