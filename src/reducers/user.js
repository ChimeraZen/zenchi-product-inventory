// reducers/user.js
import { userTypes, loadingTypes } from 'actions/types'

const initialState = {
  users: [],
  userCount: 0,
  isLoading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    
    // User actions
    case userTypes.SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case userTypes.SET_USER_COUNT:
      return {
        ...state,
        userCount: action.payload
      }
      
      
    // Loading actions
    case loadingTypes.LOADING_USERS:
      return {
        ...state,
        isLoading: action.payload
      }
      
    default: 
      return state
  }
}