// reducers/index.js
import { combineReducers } from 'redux'
import errorReducer from './error'
import authReducer from './auth'

//import productReducer from './product'
import userReducer from './user'
import userForms from './userForms'
import usersTableReducer from './usersTable'

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  //inventory: productReducer,
  userContext: userReducer,
  userForms: userForms,
  usersTable: usersTableReducer
})