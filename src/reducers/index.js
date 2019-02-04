// reducers/index.js
import { combineReducers } from 'redux'
import errorReducer from './error'
import authReducer from './auth'

//import productReducer from './product'
import userReducer from './user'

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  //inventory: productReducer,
  userContext: userReducer,
})