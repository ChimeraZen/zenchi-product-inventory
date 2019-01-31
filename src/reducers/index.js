// reducers/index.js
import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
//import productReducer from './productReducer'
import userReducer from './userReducer'

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  //inventory: productReducer,
  userContext: userReducer,
})