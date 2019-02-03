// ProductPage.js
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import $ from 'jquery'

import Modal from 'components/modal'
import UserForm from 'components/admin/forms/user'

// Actions
import { getUsers, deleteUser, updateUser } from 'actions/users'

import './styles.css'

class UsersPage extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      checkAll: false,
      checked: [],
      formType: 'new',
      formTitle: '',
      formData: [],
      saveAll: false
    }
    
    this.props.getUsers()
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(this.state.saveAll === true) {
      if(prevProps.userContext === this.props.userContext) {
        this.setState({
          checkAll: false,
          checked: [],
          formType: 'new',
          formTitle: '',
          formData: [],
          saveAll: false
        })
      }
    }
  }
  
  // Row Handlers
  handleCheckAll = () => {
    const checkAll = !this.state.checkAll
    const userCount = this.props.userContext.users.length
    
    let checked = [...this.state.checked]
    let formData = [...this.state.formData]
    
    if(checkAll) {
      for(let i=0; i < userCount; i++) {
        checked.push(i)
      }
    } else {
      checked = []
      formData = []
    }
    
    this.setState({
      checkAll,
      checked,
      formData
    })
  }
  handleCheckRow = e => {
    const id = parseInt(e.target.dataset.id)
    const checked = [...this.state.checked]
    let formData = [...this.state.formData]
    
    if(checked.indexOf(id) === -1) {
      checked.push(id)
      
      const userCount = this.props.userContext.users.length
      const checkAll = checked.length === userCount ? true : false
      
      this.setState(prevState => ({
        checkAll,
        checked
      }))
    } else {
      checked.splice(checked.indexOf(id), 1)
      formData = checked.length > 0 ? formData : []
      
      this.setState({
        checkAll: false,
        checked,
        formData
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
      formType: 'new',
      formTitle: 'Add User'
    })
  }
  handleUpdateUsers = () => {
    const Users = []
    const checked = this.state.checked
    const { users } = this.props.userContext
    
    // use filter to siphon out the users
    users.forEach((user, i) => {
      checked.indexOf(i) !== -1 && Users.push(user)
    })
    
    const formTitle = `Update User${checked.length > 1 ? 's' : ''}`
    
    this.setState({
      formType: 'update',
      formTitle: formTitle,
      formData: Users
    })
  }
  handleDeleteUsers = () => {
    const { checked } = this.state
    const { users } = this.props.userContext
    
    users.forEach((user, i) => {
      checked.indexOf(i) !== -1 && 
        this.props.deleteUser(user._id)
    })
    
    this.props.getUsers()
  }
  handleSaveAll = () => {
    this.setState({
      saveAll: true
    })
  }
  
  render() {
    const { users } = this.props.userContext
    const { checkAll,
            checked,
            formType, 
            formTitle,
            formData,
            saveAll } = this.state
    const closeOnSave = formData.length > 1 ? false : true
    
    const form = formType === 'update' 
      ? formData.map((data, i) => (
          <UserForm 
            key={`user-form-${i}`} 
            id={data._id} 
            dataId={++i}
            lastForm={formData.length}
            type={formType} 
            closeOnSave={closeOnSave} 
            saveAll={saveAll}
            data={data} />
        ))
      : <UserForm type={formType} />
    
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
        <Modal id="userFormModal" title={formTitle} label="userFormModalLabel" saveAll={this.handleSaveAll}>
          {form}
        </Modal>
      </section>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  updateUser: (id) => dispatch(updateUser(id)),
  deleteUser: (id) => dispatch(deleteUser(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UsersPage))