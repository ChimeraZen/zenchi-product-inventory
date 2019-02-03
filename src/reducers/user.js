// reducers/userReducer.js
import { userTypes } from '../actions/types'

const initialState = {
  users: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case userTypes.SET_USERS:
      return {
        ...state,
        users: action.payload.data
      }
      
    default: 
      return state
  }
}