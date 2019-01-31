// ProductPage.js
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './styles.css'

class SettingsPage extends Component {
  render() {
    return (
      <section>
        <h1>Settings Component</h1>
      </section>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(withRouter(SettingsPage))