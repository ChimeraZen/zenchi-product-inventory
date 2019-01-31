import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'

// Components
import Login from 'components/login'

// Pages
import Home from 'pages/home'

const PublicRoute = () => (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route exact path="/login" component={ Login } />
  </Switch>
)

export default withRouter(PublicRoute)