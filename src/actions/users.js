// actions/users.js

import axios from 'axios'
import { userTypes, loadingTypes, errorTypes } from './types'

const SERVER_URL = '/api/users'

// Loading Status
const loading = state => {
  return state
    ? { type: loadingTypes.IS_LOADING }
    : { type: loadingTypes.DONE_LOADING }
}


// Reducer Setters
const setUsers = users => {
  return {
    type: userTypes.GET_USERS,
    payload: users
  }
}


// CRUD
// Create
export const addUser = (user, history) => async dispatch => {
  try{
    await axios.post(`${SERVER_URL}/addUser`, user)
  } catch(err) {
    dispatch({
      type: errorTypes.GET_ERRORS,
      payload: err.response.data
    })
  }
}


// Read
export const getUsers = () => async dispatch => {
  dispatch(loading(true))
  
  const users = await axios.get(`${SERVER_URL}/getUsers`)
  dispatch(setUsers(users))
  
  dispatch(loading(false))
}


// Update
export const updateUsers = users => dispatch => {
  axios.post(`${SERVER_URL}/updateUsers`, users)
}


// Delete
export const deleteUsers = users => dispatch => {
  axios.delete(`${SERVER_URL}/deleteUsers`, users)
}