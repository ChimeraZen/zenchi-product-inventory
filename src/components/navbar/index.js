// Navbar.js

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

import { logoutUser } from 'actions/authentication'

import './styles.css'

class NavBar extends Component {
  onLogout = () => {
    this.props.logoutUser(this.props.history)
  }

  render() {
    const { isAuthenticated } = this.props.auth
    
    return (
      <div className="navbar navbar-expand navbar-light bg-light">
        <span onClick={this.props.handleToggle} className="nav-link pointer">
          <i className="fas fa-bars"></i>
        </span>
        {isAuthenticated
          ? <span className="nav-link ml-auto" title="Log Out" onClick={this.onLogout}>
              <i className="fas fa-sign-out-alt" title="Sign Out"></i>
            </span>
          : <NavLink className="nav-link ml-auto" to="/login">
              <i className="fas fa-sign-in-alt" title="Sign In"></i>
            </NavLink>
        }
      </div>
    )
  }
}

NavBar.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar))