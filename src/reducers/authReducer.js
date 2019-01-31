// reducers/authReducer.js
import { userTypes } from 'actions/types'
import isEmpty from 'validation/is-empty'

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default: 
      return state
  }
}