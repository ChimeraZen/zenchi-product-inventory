// actions/usersTable.js
import axios from 'axios'
import { userTableTypes, userTypes, loadingTypes, pageTypes } from './types'

const SERVER_URL = '/api/users'

// Loading Status
const loadingTable = state => {
  return { 
    type: loadingTypes.LOADING_USERS_TABLE,
    payload: state
  }
}


// Getters
const getUsers = async params => {
  try {
    const { perPage, activePage, sortBy, direction, filters } = params
    
    // Queries
    const perPageQuery = `perPage=${perPage}`
    const activePageQuery = `activePage=${activePage}`
    const sortByQuery = `sortBy=${sortBy}`
    const sortOrderQuery = `direction=${direction}`
    const filtersQuery = `filters=role:${filters.role}`
    
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
    
    return users.data
  } catch(err) {
    console.log(`Error getting users: ${err}`)
    return []
  }
}
const getTotalUsers = async filters => {
  try {
    // Queries
    const filtersQuery = `?filters=role:${filters.role}`
    
    // Await API response and setUsers
    const users = await axios.get(`${SERVER_URL}/getUsers${filtersQuery}`)
    
    return users.data.length
  } catch(err) {
    console.log(`Error getting total users: ${err}`)
  }
}


// Reducer Setters
const setUsers = users => {
  return {
    type: userTypes.SET_USERS,
    payload: users
  }
}
const setTotalUsers = totalUsers => {
  return {
    type: userTypes.SET_TOTAL_USERS,
    payload: totalUsers
  }
}
const setFilters = filters => {
  return {
    type: userTableTypes.SET_FILTERS,
    payload: filters
  }
}

// Checkboxes
const setCheckAll = checkAll => {
  return {
    type: userTableTypes.SET_CHECK_ALL,
    payload: checkAll
  }
}
const setChecked = checked => {
  return {
    type: userTableTypes.SET_CHECKED,
    payload: checked
  }
}

// Pagination
const setPages = pages => {
  return {
    type: pageTypes.SET_PAGES,
    payload: pages
  }
}
const setTotalPages = totalPages => {
  return {
    type: pageTypes.SET_TOTAL_PAGES,
    payload: totalPages
  }
}
const setPerPage = perPage => {
  return {
    type: pageTypes.SET_PER_PAGE,
    payload: perPage
  }
}
const setActivePage = page => {
  return {
    type: pageTypes.SET_ACTIVE_PAGE,
    payload: page
  }
}

// Sorting
const setSortBy = sortBy => {
  return {
    type: pageTypes.SET_SORT_BY,
    payload: sortBy
  }
}
const setSortDirection = direction => {
  return {
    type: pageTypes.SET_SORT_DIRECTION,
    payload: direction
  }
}


// Exports
export const resetUsersTableCheckboxes = () => dispatch => {
  try {
    dispatch(setCheckAll(false))
    dispatch(setChecked([]))
  } catch(err) {
    console.log(`Error resetting checkboxes: ${err}`)
  }
}
export const setUsersTableCheckboxes = ({ checkAll, checked }) => dispatch => {
  try {
    dispatch(setCheckAll(checkAll))
    dispatch(setChecked(checked))
  } catch(err) {
    console.log(`Error setting checkboxes: ${err}`)
  }
}
export const getUsersTable = ({ activePage, perPage, sortBy, direction, filters }) => async dispatch => {
  try {
    dispatch(loadingTable(true))
    
    // Users
    const users = await getUsers({ perPage, activePage, sortBy, direction, filters })
    const totalUsers = await getTotalUsers(filters)
    
    // Users
    dispatch(setUsers(users))
    dispatch(setTotalUsers(totalUsers))
    
    // Filters
    dispatch(setFilters(filters))
    dispatch(setSortBy(sortBy))
    dispatch(setSortDirection(direction))
    
    // Pagination
    const totalPages = (totalUsers > perPage && perPage !== 0) ? Math.ceil( totalUsers / perPage ) : 1
    
    // Catch incase deletion results in one page left
    activePage = totalPages === 1 ? 1 : activePage
    
    const pages = []
    for(let i=1; i <= totalPages; i++) {
      pages.push(i)
    }
    
    dispatch(setTotalPages(totalPages))
    dispatch(setPages(pages))
    dispatch(setPerPage(perPage))
    dispatch(setActivePage(activePage))
    
    dispatch(loadingTable(false))
  } catch(err) {
    console.log(`Error getting users table: ${err}`)
  }
}