import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, NavLink } from 'react-router-dom'

// Components
import NavBar from 'components/navbar'

// Pages
import AdminPage from 'pages/admin'
//import ProductPage from 'pages/admin/products'
import UsersPage from 'pages/admin/users'
import SettingsPage from 'pages/admin/settings'

// Styles
import './styles.css'

class AdminRoute extends Component {
  state = {
    isOpen: true
  }

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  
  render() {
    const { isOpen } = this.state
    
    return (
      <section className="admin-route container-fluid p-0 d-flex">
        <aside className={`col-lg-2 col-md-2 col-sm-2 p-0 navbar-dark bg-dark ${isOpen ? "open" : "closed"}`}>
          <ul className="navbar-nav px-2">
            <li className="nav-item">
              <NavLink className="nav-link d-flex flex-nowrap" exact to="/admin">
                <i className="fab fa-fort-awesome mr-2 my-auto"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
            {/*
            <li className="nav-item">
              <NavLink className="nav-link d-flex flex-nowrap" to="/admin/products">
                <i className="fas fa-store mr-2 my-auto"></i>
                <span>Products</span>
              </NavLink>
            </li>
            */}
            <li className="nav-item">
              <NavLink className="nav-link d-flex flex-nowrap" to="/admin/users">
                <i className="fas fa-users mr-2 my-auto"></i>
                <span>Users</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex flex-nowrap" to="/admin/settings">
                <i className="fas fa-cogs mr-2 my-auto"></i>
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </aside>
        
        <main className="container-fluid p-0">
          <NavBar handleToggle={this.handleToggle} />
          <Switch>
            <Route exact path="/admin" component={ AdminPage } />
            {/* <Route path="/admin/products" component={ ProductPage } /> */}
            <Route path="/admin/users" component={ UsersPage } />
            <Route path="/admin/settings" component={ SettingsPage } />
          </Switch>
        </main>
      </section>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(withRouter(AdminRoute))