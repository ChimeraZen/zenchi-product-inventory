// Navbar.js

import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Redirect } from 'react-router-dom'

let ProtectedRoute = ({ component: Component, isAuthenticated }) => (
  <Route
    render={props => {
      if(isAuthenticated) {
        return <Component {...props} />
      } else {
        return <Redirect to="/login" />
      }
    }}
  />
)

const mapStateToProps = state => state.auth

export default connect(mapStateToProps, null)(withRouter(ProtectedRoute))