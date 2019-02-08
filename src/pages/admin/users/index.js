// ProductPage.js
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import uniqid from 'uniqid'

// Components
import UsersTable from 'components/tables/users'
import Modal from 'components/modal'
import UserForm from 'components/admin/forms/user'

// Actions
import { getUsersTable, setUsersTableCheckboxes } from 'actions/usersTable'
import { setNewForm, setUpdateForms, resetUserForms } from 'actions/userForms'
import { getUsers, updateUser, deleteUser } from 'actions/users'

import './styles.css'


const uniqueModalId = `userFormModal-${uniqid()}`


const initialForm = {
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  changePassword: false,
  password: '',
  passwordConfirm: '',
  role: 'staff',
  errors: {}
}

class UsersPage extends Component {
  state = {
    saveAll: false
  }
  handleNewUser = () => {
    this.props.setNewForm([initialForm])
  }
  handleUpdateUsers = () => {
    const { users, checked } = this.props.usersTable
    const forms = checked.map(i => {
      return users[i]
    })
    
    this.props.setUpdateForms(forms)
  }
  handleModalClose = () => {
    const {
      perPage, 
      activePage, 
      sortBy, 
      direction, 
      filters 
    } = this.props.usersTable
    
    const checkAll = false
    const checked = []
    
    this.props.resetUserForms()
    this.props.setUsersTableCheckboxes({ checkAll, checked })
    this.props.getUsersTable({
      perPage, 
      activePage, 
      sortBy, 
      direction, 
      filters 
    })
    
    this.setState({
      saveAll: false
    })
  }
  saveAll = () => {
    this.setState({
      saveAll: true
    })
  }
  
  render() {
    const { checked } = this.props.usersTable
    const { title, forms, formType } = this.props.userForms
    
    const closeOnSave = forms.length === 1
    const saveAllButton = <button type="button" className="btn btn-outline-success" onClick={this.saveAll}>Save All</button>
    
    const userForms = formType === 'update' 
      ? forms.map((data, i) => (
          <UserForm 
            key={`user-form-${i++}`} 
            id={data._id} 
            dataId={i++}
            lastForm={forms.length}
            type={formType} 
            onClose={this.handleModalClose}
            closeOnSave={closeOnSave} 
            saveAll={this.state.saveAll}
            data={data} />
        ))
      : <UserForm type={formType} />
    
    return (
      <section className="container-fluid p-0">
        <nav className="navbar nav-expand navbar-dark px-2" style={{backgroundColor: "#EEE"}}>
          <ul className="nav">
            <li className="nav-item mr-2">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#${uniqueModalId}`} onClick={this.handleNewUser}>New User</button>
            </li>
            {
              checked.length > 0 && 
                <React.Fragment>
                  <li className="nav-item mr-2">
                    <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#${uniqueModalId}`} onClick={this.handleUpdateUsers}>Update</button>
                  </li>
                  <li className="nav-item mr-2">
                    <button type="button" className="btn btn-danger" onClick={this.handleDeleteUsers}>Delete</button>
                  </li>
                </React.Fragment>
            }
          </ul>
        </nav>
        <UsersTable />
        <Modal id={uniqueModalId} title={title} label="userFormModalLabel" onClose={this.handleModalClose} multiAction={saveAllButton}>
          {userForms}
        </Modal>
      </section>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  getUsersTable: params => dispatch(getUsersTable(params)),
  setUsersTableCheckboxes: params => dispatch(setUsersTableCheckboxes(params)),
  setNewForm: form => dispatch(setNewForm(form)),
  setUpdateForms: forms => dispatch(setUpdateForms(forms)),
  resetUserForms: () => dispatch(resetUserForms()),
  getUsers: params => dispatch(getUsers(params)),
  updateUser: id => dispatch(updateUser(id)),
  deleteUser: id => dispatch(deleteUser(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UsersPage))