// actions/users.js

import axios from 'axios'
import { userTypes, errorTypes } from './types'

const SERVER_URL = '/api/users'

const setUsers = users => {
  return {
    type: userTypes.SET_USERS,
    payload: users
  }
}

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
export const getUsers = params => async dispatch => {
  try {
    const { perPage, activePage, sortBy, direction, usersFilter } = params
    
    // Queries
    const perPageQuery = `perPage=${perPage}`
    const activePageQuery = `activePage=${activePage}`
    const sortByQuery = `sortBy=${sortBy}`
    const sortOrderQuery = `direction=${direction}`
    const filtersQuery = `filters=role:${usersFilter.role}`
    
    // Query array to string
    const queryArray = [
      perPageQuery,
      activePageQuery,
      sortByQuery,
      sortOrderQuery,
      filtersQuery
    ]
    const query = `?${queryArray.join('&')}`
    
    // Await API response and setUsers
    const users = await axios.get(`${SERVER_URL}/getUsers${query}`)
    
    dispatch(setUsers(users.data))
  } catch(err) {
    console.log('Error with getUsers action: ', err)
  }
}
export const updateUser = params => dispatch => {
  try {
    const { id, user } = params
    axios.post(`${SERVER_URL}/${id}/updateUser`, user)
  } catch(err) {
    dispatch({
      type: errorTypes.GET_ERRORS,
      payload: err.response.data
    })
  }
}
export const deleteUser = id => dispatch => {
  try {
    axios.delete(`${SERVER_URL}/${id}/deleteUser`)
  } catch(err) {
    dispatch({
      type: errorTypes.GET_ERRORS,
      payload: err.response.data
    })
  }
}
