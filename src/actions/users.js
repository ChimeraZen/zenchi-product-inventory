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
    type: userTypes.SET_USERS,
    payload: users
  }
}


// CRUD
// Create
export const addUser = user => dispatch => {
  try{
    axios.put(`${SERVER_URL}/addUser`, user)
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
export const updateUser = (id, user) => dispatch => {
  axios.post(`${SERVER_URL}/${id}/updateUser`, user)
}


// Delete
export const deleteUser = id => dispatch => {
  axios.delete(`${SERVER_URL}/${id}/deleteUser`)
}