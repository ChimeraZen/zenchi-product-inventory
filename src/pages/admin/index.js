// Home.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class AdminPage extends Component {
  render() {
    return (
      <div>
        Primary Admin Component
      </div>
    )
  }
}

const mapStateToProps = state => state

AdminPage = connect(mapStateToProps, null)(withRouter(AdminPage))

export default AdminPage