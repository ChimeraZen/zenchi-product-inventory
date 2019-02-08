// reducers/usersTable.js
import { userTableTypes, userTypes, loadingTypes, pageTypes } from 'actions/types'

const initialState = {
  users: [],
  totalUsers: 0,
  headers: {
    username: 'Username',
    email: 'Email',
    role: 'Role',
    firstname: 'First Name',
    lastname: 'Last Name',
    date: 'Created On'
  },
  filters: {
    role: ''
  },
  pages: [1],
  perPage: 10,
  activePage: 1,
  totalPages: 1,
  sortBy: 'email',
  direction: 'asc',
  checkAll: false,
  checked: [],
  isLoading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
      
    // User actions
    case userTypes.SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case userTypes.SET_TOTAL_USERS:
      return {
        ...state,
        totalUsers: action.payload
      }
    
    // Table actions
    case userTableTypes.SET_FILTERS:
      return {
        ...state,
        filters: action.payload
      }
    case userTableTypes.SET_CHECK_ALL:
      return {
        ...state,
        checkAll: action.payload
      }
    case userTableTypes.SET_CHECKED:
      return {
        ...state,
        checked: action.payload
      }
      
      
    // Page actions
    case pageTypes.SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload
      }
    case pageTypes.SET_PER_PAGE:
      return {
        ...state,
        perPage: action.payload
      }
    case pageTypes.SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload
      }
    case pageTypes.SET_PAGES:
      return {
        ...state,
        pages: action.payload
      }
    case pageTypes.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload
      }
    case pageTypes.SET_SORT_DIRECTION:
      return {
        ...state,
        direction: action.payload
      }
      
      
    // Loading actions
    case loadingTypes.LOADING_USERS_TABLE:
      return {
        ...state,
        isLoading: action.payload
      }
      
    default: 
      return state
  }
}