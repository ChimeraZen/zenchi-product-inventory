// actions/userForms.js
import { userFormTypes, loadingTypes } from 'actions/types'

const isLoading = value => {
  return {
    type: loadingTypes.IS_LOADING,
    payload: value
  }
}

export const setNewForm = form => dispatch => {
  dispatch({
    type: userFormTypes.SET_NEW_FORM,
    payload: form
  })
}
export const setUpdateForms = forms => dispatch => {
  dispatch(isLoading(true))
  dispatch({
    type: userFormTypes.SET_UPDATE_FORMS,
    payload: forms
  })
  dispatch(isLoading(false))
}

export const resetUserForms = () => dispatch => {
  dispatch({
    type: userFormTypes.RESET_FORMS
  })
}