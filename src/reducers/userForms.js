// reducers/userForms.js
import { userFormTypes, loadingTypes } from 'actions/types'

const initialState = {
  formType: 'new',
  title: 'Add User',
  forms: [],
  isLoading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    
    // Form actions
    case userFormTypes.SET_NEW_FORM:
      return {
        formType: 'new',
        title: 'Add User',
        forms: action.payload
      }
    case userFormTypes.SET_UPDATE_FORMS:
      return {
        formType: 'update',
        title: `Update User${action.payload.length > 1 ? 's' : ''}`,
        forms: action.payload
      }
    case userFormTypes.RESET_FORMS:
      return initialState
      
      
    // Loading actions
    case loadingTypes.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
      
    default: 
      return state
  }
}