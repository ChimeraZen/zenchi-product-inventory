// ProductPage.js
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import UserForm from 'components/admin/forms/user'

// Actions
import { getUsers, deleteUsers } from 'actions/users'

import './styles.css'

class UsersPage extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      checkAll: false,
      checked: [],
      formType: 'new',
      updateUsers: []
    }
    
    this.props.dispatch(getUsers())
  }
  
  // Row Handlers
  handleCheckAll = () => {
    const checkAll = !this.state.checkAll
    const userCount = this.props.userContext.users.length
    
    let checked = [...this.state.checked]
    
    if (checkAll) {
      for(let i=0; i < userCount; i++) {
        checked.push(i)
      }
    } else {
      checked = []
    }
    
    this.setState({
      checkAll,
      checked
    })
  }
  handleCheckRow = e => {
    const id = parseInt(e.target.dataset.id)
    const checked = [...this.state.checked]
    
    if (checked.indexOf(id) === -1) {
      checked.push(id)
      
      const userCount = this.props.userContext.users.length
      const checkAll = checked.length === userCount ? true : false
      
      this.setState(prevState => ({
        checkAll,
        checked
      }))
    } else {
      checked.splice(checked.indexOf(id), 1)
      this.setState({
        checkAll: false,
        checked
      })
    }
  }
  handleCheckedStatus = id => {
    return this.state.checked.indexOf(id) !== -1
      ? true
      : false
  }
  
  // CRUD Handlers
  handleNewUser = () => {
    this.setState({
      formType: 'new'
    })
  }
  handleUpdateUsers = () => {
    const Users = []
    const checked = this.state.checked
    const { users } = this.props.userContext
    users.forEach((user, i) => {
      checked.indexOf(i) !== -1 && Users.push(user)
    })
    
    this.setState({
      formType: 'update',
      updateUsers: Users
    })
  }
  handleDelete = () => {
    const Users = []
    const checked = this.state.checked
    const { users } = this.props.userContext
    
    users.forEach((user, i) => {
      checked.indexOf(i) !== -1 && Users.push(user.email)
    })
    
    Users.length > 0 && this.props.dispatch(deleteUsers(Users))
    getUsers()
  }
  
  
  render() {
    const { formType, 
            updateUsers,
            checked,
            checkAll } = this.state
    const { users } = this.props.userContext
    
    return (
      <section className="container-fluid p-0">
        <nav className="navbar nav-expand navbar-dark px-2" style={{backgroundColor: "#EEE"}}>
          <ul className="nav">
            <li className="nav-item mr-2">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#userFormModal" onClick={this.handleNewUser}>New User</button>
            </li>
            {
              checked.length > 0 && 
                <React.Fragment>
                  <li className="nav-item mr-2">
                    <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#userFormModal" onClick={this.handleUpdateUsers}>Update</button>
                  </li>
                  <li className="nav-item mr-2">
                    <button type="button" className="btn btn-danger" onClick={this.handleDeleteUsers}>Delete</button>
                  </li>
                </React.Fragment>
            }
          </ul>
        </nav>
        <section className="container-fluid py-3">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <input 
                    type="checkbox" 
                    checked={checkAll} 
                    onChange={this.handleCheckAll} 
                  />
                </th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Created On</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                const date = new Date(user.date)
                const checked = this.handleCheckedStatus(i)

                return <tr key={`user${i}`}>
                  <td>
                    <input 
                      type="checkbox" 
                      data-id={i}
                      checked={checked} 
                      onChange={this.handleCheckRow} 
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{date.toDateString()}</td>
                </tr>
              })}
            </tbody>
          </table>
        </section>
        <UserForm formType={formType} users={updateUsers} />
      </section>
    )
  }
}

const mapStateToProps = state => state



export default connect(mapStateToProps, null)(withRouter(UsersPage))