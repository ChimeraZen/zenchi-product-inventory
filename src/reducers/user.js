// reducers/userReducer.js
import { userTypes, loadingTypes, pageTypes } from '../actions/types'

const initialState = {
  users: [],
  perPage: 10,
  activePage: 1,
  pageCount: 1,
  sortBy: 'email',
  direction: 'asc',
  isLoading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case userTypes.SET_USERS:
      return {
        ...state,
        users: action.payload.data
      }
      
      
    // Page Params
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
    case pageTypes.SET_PAGE_COUNT:
      return {
        ...state,
        pageCount: action.payload
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
      
      
    // Loading
    case loadingTypes.LOADING_USERS:
      return {
        ...state,
        isLoading: action.payload
      }
      
    default: 
      return state
  }
}