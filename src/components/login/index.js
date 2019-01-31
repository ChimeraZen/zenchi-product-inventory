// components/login/index.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'

// Actions
import { loginUser } from 'actions/authentication'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(user)
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/admin')
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/admin')
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  render() {
    const {errors} = this.state
    
    return (
      <div className="container" style={{ marginTop: '50px', width: '700px'}}>
        <h2 style={{marginBottom: '40px'}}>Login</h2>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input
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
          <div className="form-group">
            <input
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
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login User
            </button>
          </div>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)