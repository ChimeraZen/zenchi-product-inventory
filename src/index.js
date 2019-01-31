import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import store from 'store'

// Actions
import { setCurrentUser, logoutUser } from 'actions/authentication'

// Authentication
import jwt_decode from 'jwt-decode'
import setAuthToken from 'setAuthToken'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
}

ReactDOM.render(
  <Provider store = { store }>
    <App />
  </Provider>, document.getElementById('root'))
