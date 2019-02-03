// actions/authentication.js
import axios from 'axios'
import { userTypes, errorTypes } from './types'
import setAuthToken from '../setAuthToken'
import jwt_decode from 'jwt-decode'

const SERVER_URL = '/api/users'

export const loginUser = user => async dispatch => {
  try{
    const res = await axios.post(`${SERVER_URL}/login`, user)
    
    if(res) {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
    }
  } catch (err) {
    dispatch({
      type: errorTypes.GET_ERRORS,
      payload: err.response.data
    })
  }
}

export const setCurrentUser = decoded => {
  return {
    type: userTypes.SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = history => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
  history && history.push('/login')
}