// actions/users.js

import axios from 'axios'
import { userTypes, loadingTypes, errorTypes, pageTypes } from './types'

const SERVER_URL = '/api/users'

// Loading Status
const loadingUsers = state => {
  return { 
    type: loadingTypes.LOADING_USERS,
    payload: state
  }
}


// Reducer Setters
const setUsers = users => {
  return {
    type: userTypes.SET_USERS,
    payload: users
  }
}
const setPageCount = pageCount => {
  return {
    type: pageTypes.SET_PAGE_COUNT,
    payload: pageCount
  }
}
export const setPerPage = page => {
  return {
    type: pageTypes.SET_PER_PAGE,
    payload: page
  }
}
export const setActivePage = page => {
  return {
    type: pageTypes.SET_ACTIVE_PAGE,
    payload: page
  }
}
export const setSortBy = sortBy => {
  return {
    type: pageTypes.SET_SORT_BY,
    payload: sortBy
  }
}
export const setSortDirection = direction => {
  return {
    type: pageTypes.SET_SORT_DIRECTION,
    payload: direction
  }
}


// Reducer Getters
const getPageCount = perPage => async dispatch => {
  const userCount = await axios.get(`${SERVER_URL}/getUserCount`)
  const pageCount = perPage > 0 ? Math.ceil( userCount.data / perPage ) : 1
  pageCount === 1 && await dispatch(setActivePage(1))
  dispatch(setPageCount(pageCount))
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
export const getUsers = (params) => async dispatch => {
  try {
    dispatch(loadingUsers(true))
    
    // Queries
    const perPageQuery = `perPage=${params.perPage}`
    const activePageQuery = `activePage=${params.activePage}`
    const sortByQuery = `sortBy=${params.sortBy}`
    const sortOrderQuery = `direction=${params.direction}`
    
    
    // Query array to string
    const queryArray = [
      perPageQuery,
      activePageQuery,
      sortByQuery,
      sortOrderQuery
    ]
    const query = `?${queryArray.join('&')}`
    
    // Await API response and setUsers
    const users = await axios.get(`${SERVER_URL}/getUsers${query}`)
    
    dispatch(getPageCount(params.perPage))
    await dispatch(setUsers(users))
    
    dispatch(loadingUsers(false))
  } catch(err) {
    console.log('Error with getUsers action: ', err)
  }
}


// Update
export const updateUser = (id, user) => dispatch => {
  try {
    axios.post(`${SERVER_URL}/${id}/updateUser`, user)
  } catch(err) {
    dispatch({
      type: errorTypes.GET_ERRORS,
      payload: err.response.data
    })
  }
}


// Delete
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