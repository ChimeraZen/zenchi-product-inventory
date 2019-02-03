// reducers/index.js
import { combineReducers } from 'redux'
import errorReducer from './error'
import authReducer from './auth'

import modalReducer from './modal'
//import productReducer from './product'
import userReducer from './user'

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  modal: modalReducer,
  //inventory: productReducer,
  userContext: userReducer,
})