import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import $ from 'jquery'

// Actions
import { addUser, getUsers, updateUsers } from 'actions/users'

class UserForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirm: '',
    role: 'staff',
    formTitle: 'Add User',
    errors: {}
  }

  componentDidUpdate(prevProps, prevState, snap) {
    const { formType, users } = this.props
    if (prevProps !== this.props) {
      if (users.length > 0 && formType === 'update') {
        const user = users[0]
        this.setState({
          firstname: user.firstname,
          lastname: user.lastname,
          password: '',
          password_confirm: '',
          email: user.email,
          role: user.role,
          formTitle: 'Update User'
        })
      }
      
      if (formType === 'new') {
        this.setState({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          password_confirm: '',
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
    const { formType } = this.props
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
      role: this.state.role
    }
    
    switch(formType) {
      case 'update':
        this.props.dispatch(updateUsers([user]))
      break;
        
      case 'new':
        this.props.dispatch(addUser(user))
      break;
        
      default:
      break;
    }
    //this.props.addUser(user)
    this.props.dispatch(getUsers())
    $('.close').click()
  }
  
  render() {
    const { formTitle, errors } = this.state
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
              <form onSubmit={ this.handleSubmit }>
                <div className="form-row">
                  
                  {/* Name */}
                  <div className="form-group col-md-6">
                    <label htmlFor="user-first-name">Name</label>
                    <input
                      id="user-first-name"
                      type="text"
                      placeholder="First Name"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                      })}
                      name="firstname"
                      onChange={ this.handleInputChange }
                      value={ this.state.firstname }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="user-last-name">&nbsp;</label>
                    <input
                      id="user-last-name"
                      type="text"
                      placeholder="Last Name"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                      })}
                      name="lastname"
                      onChange={ this.handleInputChange }
                      value={ this.state.lastname }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
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
                        'is-invalid': errors.password_confirm
                      })}
                      name="password_confirm"
                      onChange={ this.handleInputChange }
                      value={ this.state.password_confirm }
                    />
                    {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
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
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-success">Save</button>
                </div>
              </form>
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