// pages/home/index.js
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class HomePage extends Component {
  render() {
    return (
      <div>
        Home Component
      </div>
    )
  }
}

export default withRouter(HomePage)