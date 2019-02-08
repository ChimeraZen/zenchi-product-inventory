import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import $ from 'jquery'

// Actions
import { addUser, updateUser } from 'actions/users'

const initialState = {
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

class UserForm extends Component {
  state = initialState

  // Lifecycle
  componentDidMount() {
    const { data } = this.props
    
    data && this.setState({
      username: data.username,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      role: data.role
    })
  }
  componentDidUpdate(prevProps, prevState) {
    const { id, saveAll } = this.props
    
    if(saveAll && id && saveAll) {
      const { 
        username,
        firstname,
        lastname,
        email,
        changePassword,
        password,
        passwordConfirm,
        role 
      } = this.state

      const user = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        role: role
      }

      if(changePassword) {
        user.password = password
        user.passwordConfirm = passwordConfirm
      }
      
      this.props.updateUser({id, user})
      
      if(this.props.dataId === this.props.lastForm) {
        $('.close').click()
      }
    }
  }

  // Handlers
  handleInputChange = e => {
    const { name, value } = e.target
    
    this.setState({
      [name]: value
    })
  }
  handleChangePassword = () => {
    this.setState({
      changePassword: !this.state.changePassword
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    const { type, closeOnSave } = this.props
    
    const { username,
            firstname,
            lastname,
            email,
            changePassword,
            password,
            passwordConfirm,
            role } = this.state
    
    const user = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      role: role
    }
    
    if(changePassword || type === 'new') {
      user.password = password
      user.passwordConfirm = passwordConfirm
    }
    
    switch(type) {
      case 'new':
        this.props.addUser(user)
        $('.close').click()
        this.handleReset()
      break;
        
      case 'update':
        this.props.updateUser(this.props.id, user)
        if(closeOnSave) {
          $('.close').click()
          this.handleReset()
        }
      break;
        
      default:
      break;
    }
  }
  
  handleReset = () => {
    this.setState(initialState)
  }
  
  render() {
    const { formId, type } = this.props
    
    const { username,
            firstname,
            lastname,
            email,
            changePassword,
            password,
            passwordConfirm,
            role,
            errors } = this.state
    
    return (
      <form id={formId} className="mr-3" onSubmit={this.handleSubmit} style={{maxWidth: '468px'}}>
        {/* Username */}
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor={`user-username-${this.props.id}`}>Username</label>
            <input
              id={`user-username-${this.props.id}`}
              type="text"
              placeholder="Username"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.username
              })}
              name="username"
              onChange={ this.handleInputChange }
              value={ username }
            />
            {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
          </div>
        </div>


        {/* Name */}
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor={`user-firstname-${this.props.id}`}>Name</label>
            <input
              id={`user-firstname-${this.props.id}`}
              type="text"
              placeholder="First Name"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.firstname
              })}
              name="firstname"
              onChange={ this.handleInputChange }
              value={ firstname }
            />
            {errors.firstname && (<div className="invalid-feedback">{errors.firstname}</div>)}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor={`user-lastname-${this.props.id}`}>&nbsp;</label>
            <input
              id={`user-lastname-${this.props.id}`}
              type="text"
              placeholder="Last Name"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.lastname
              })}
              name="lastname"
              onChange={ this.handleInputChange }
              value={ lastname }
            />
            {errors.lastname && (<div className="invalid-feedback">{errors.lastname}</div>)}
          </div>
        </div>


        {/* Email */}
        <div className="form-row">
          <div className="form-group col-12">
            <label htmlFor={`user-email-${this.props.id}`}>Email</label>
            <input
              id={`user-email-${this.props.id}`}
              type="email"
              placeholder="Email"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.email
              })}
              name="email"
              onChange={ this.handleInputChange }
              value={ email }
            />
            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
          </div>
        </div>


        {/* Password */}
        <div className="form-row">
          {
            type === 'update' && 
              <div className="form-check form-check-inline col-12 mb-2">
                <label htmlFor={`change-user-password-${this.props.id}`} className="form-check-label mr-2">Change Password</label>
                <input 
                  id={`change-user-password-${this.props.id}`}
                  className="form-check-input"
                  type="checkbox" 
                  onChange={this.handleChangePassword}
                  checked={changePassword} 
                />
              </div>
          }
          
          {
            (changePassword || type === 'new') && 
              <React.Fragment>
                <div className="form-group col-12">
                  {
                    type === 'new' && 
                      <label htmlFor={`user-password-${this.props.id}`}>
                        Password
                      </label>
                  }
                  <input
                    id={`user-password-${this.props.id}`}
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ password }
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
                    value={ passwordConfirm }
                  />
                  {errors.passwordConfirm && (<div className="invalid-feedback">{errors.passwordConfirm}</div>)}
                </div>
              </React.Fragment>
          }
          
        </div>


        {/* Role */}
        <div className="form-row">
          <div className="form-group col-12">
            <label htmlFor={`user-role-${this.props.id}`}>Role:</label>
            <select id={`user-role-${this.props.id}`} name="role" className="custom-select" value={ role } onChange={this.handleInputChange}>
              <option value="super">Super User</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="form-row justify-content-end mr-3">
          <button type="button" className="btn btn-secondary mr-2" data-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-success">Save</button>
        </div>
      </form>
    )
  }
}

UserForm.propTypes = {
  auth: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  userContext: state.userContext,
  errors: state.errors
})

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUser(user)),
  updateUser: params => dispatch(updateUser(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)