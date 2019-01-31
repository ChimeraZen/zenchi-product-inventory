// App.js
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Routes
import AdminRoute from 'routes/admin'
import PublicRoute from 'routes/public'
import ProtectedRoute from 'routes/protected'

// Styles
import 'app.css'

const App = () => (
  <Router>
    <Switch>
      <ProtectedRoute path="/admin" component={ AdminRoute } />
      <Route path="/" component={ PublicRoute } />
    </Switch>
  </Router>
)

export default App