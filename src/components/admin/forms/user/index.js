import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import $ from 'jquery'

// Actions
import { addUser, getUsers, updateUsers } from 'actions/users'

class UserForm extends Component {
  state = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'staff',
    formTitle: 'Add User',
    users: [],
    errors: {}
  }

  componentDidUpdate(prevProps, prevState, snap) {
    const { formType, users } = this.props
    if (prevProps !== this.props) {
      if (users.length > 0 && formType === 'update') {
        this.setState({
          users: users,
          formTitle: 'Update User'
        })
      }
      
      if (formType === 'new') {
        this.setState({
          username: '',
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          passwordConfirm: '',
          role: 'staff',
          errors: {},
          formTitle: 'Add User'
        })
      }
    }
  }


  // Handlers
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    const user = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      role: this.state.role
    }
    
    this.props.dispatch(addUser(user))
    this.props.dispatch(getUsers())
    $('.close').click()
  }
  
  handleInputChangeMany = e => {
    const users = [...this.state.users]
    const id = parseInt(e.target.dataset.id)
    
    users[id][e.target.name] = e.target.value
    
    this.setState({
      users
    })
  }
  handleSubmitMany = e => {
    e.preventDefault()
    const users = [...this.state.users]
    const id = parseInt(e.target.dataset.id)
    
    this.props.dispatch(updateUsers(users[id]))
    this.props.dispatch(getUsers())
    $('.close').click()
  }
  
  
  // Forms
  newForm = () => {
    const { errors } = this.state
    
    return (
      <form onSubmit={ this.handleSubmit }>
        {/* Username */}
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="user-name">Username</label>
            <input
              id="user-name"
              type="text"
              placeholder="Username"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.username
              })}
              name="username"
              onChange={ this.handleInputChange }
              value={ this.state.username }
            />
            {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
          </div>
        </div>


        {/* Name */}
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="user-first-name">Name</label>
            <input
              id="user-first-name"
              type="text"
              placeholder="First Name"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.firstname
              })}
              name="firstname"
              onChange={ this.handleInputChange }
              value={ this.state.firstname }
            />
            {errors.firstname && (<div className="invalid-feedback">{errors.firstname}</div>)}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="user-last-name">&nbsp;</label>
            <input
              id="user-last-name"
              type="text"
              placeholder="Last Name"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.lastname
              })}
              name="lastname"
              onChange={ this.handleInputChange }
              value={ this.state.lastname }
            />
            {errors.lastname && (<div className="invalid-feedback">{errors.lastname}</div>)}
          </div>
        </div>


        {/* Email */}
        <div className="form-row">
          <div className="form-group col-12">
            <label htmlFor="user-email">Email</label>
            <input
              id="user-email"
              type="email"
              placeholder="Email"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.email
              })}
              name="email"
              onChange={ this.handleInputChange }
              value={ this.state.email }
            />
            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
          </div>
        </div>


        {/* Password */}
        <div className="form-row">
          <div className="form-group col-12">
            <label htmlFor="user-password">Password</label>
            <input
              id="user-password"
              type="password"
              placeholder="Password"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.password
              })}
              name="password"
              onChange={ this.handleInputChange }
              value={ this.state.password }
            />
            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
          </div>
          <div className="form-group col-12">
            <input
              type="password"
              placeholder="Confirm Password"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.passwordConfirm
              })}
              name="passwordConfirm"
              onChange={ this.handleInputChange }
              value={ this.state.passwordConfirm }
            />
            {errors.passwordConfirm && (<div className="invalid-feedback">{errors.passwordConfirm}</div>)}
          </div>
        </div>


        {/* Role */}
        <div className="form-group">
          <label htmlFor="user-role">Role:</label>
          <select id="user-role" name="role" className="custom-select" value={this.state.role} onChange={this.handleInputChange}>
            <option value="super">Super User</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-success">Save</button>
        </div>
      </form>
    )
  }
  updateForms = () => {
    const { users, errors } = this.state
    const userForms = users.length > 0 && users.map((user, i) => {
      
      return (
        <form key={`user${i}`} id={`user-form-${i}`} data-id={i} onSubmit={ this.handleSubmitMany }>
          {/* Username */}
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="user-name">Username</label>
              <input
                id="user-name"
                data-id={i}
                type="text"
                placeholder="Username"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.username
                })}
                name="username"
                onChange={ this.handleInputChangeMany }
                value={ user.username }
              />
              {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
            </div>
          </div>
          
          
          {/* Name */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="user-first-name">Name</label>
              <input
                id="user-first-name"
                data-id={i}
                type="text"
                placeholder="First Name"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.firstname
                })}
                name="firstname"
                onChange={ this.handleInputChangeMany }
                value={ user.firstname }
              />
              {errors.firstname && (<div className="invalid-feedback">{errors.firstname}</div>)}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="user-last-name">&nbsp;</label>
              <input
                id="user-last-name"
                data-id={i}
                type="text"
                placeholder="Last Name"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.lastname
                })}
                name="lastname"
                onChange={ this.handleInputChangeMany }
                value={ user.lastname }
              />
              {errors.lastname && (<div className="invalid-feedback">{errors.lastname}</div>)}
            </div>
          </div>


          {/* Email */}
          <div className="form-row">
            <div className="form-group col-12">
              <label htmlFor="user-email">Email</label>
              <input
                id="user-email"
                data-id={i}
                type="email"
                placeholder="Email"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.email
                })}
                name="email"
                onChange={ this.handleInputChangeMany }
                value={ user.email }
              />
              {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
            </div>
          </div>


          {/* Password */}
          <div className="form-row">
            <div className="form-group col-12">
              <label htmlFor="user-password">Password</label>
              <input
                id="user-password"
                data-id={i}
                type="password"
                placeholder="Password"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.password
                })}
                name="password"
                onChange={ this.handleInputChangeMany }
                value={ user.newPassword || '' }
              />
              {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
            </div>
            <div className="form-group col-12">
              <input
                type="password"
                data-id={i}
                placeholder="Confirm Password"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.passwordConfirm
                })}
                name="passwordConfirm"
                onChange={ this.handleInputChangeMany }
                value={ user.newPassword_confirm || ''}
              />
              {errors.passwordConfirm && (<div className="invalid-feedback">{errors.passwordConfirm}</div>)}
            </div>
          </div>


          {/* Role */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="user-role">Role:</label>
              <select 
                id="user-role"
                data-id={i} 
                name="role" 
                className="custom-select" 
                value={user.role} 
                onChange={this.handleInputChangeMany}
              >
                <option value="super">Super User</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-success">Save</button>
          </div>
        </form>
      )
    })
    
    return <div className="d-flex">
      {userForms}
    </div>
    
  }
  
  render() {
    const { formTitle } = this.state
    const { formType } = this.props
    
    return (
      <div className="modal fade" id="userFormModal" tabIndex="-1" role="dialog" aria-labelledby="userFormModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userFormModalLabel">{formTitle}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {formType === 'new' && this.newForm()}
              {formType === 'update' && this.updateForms()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UserForm.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, null)(UserForm)