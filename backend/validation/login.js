// backend/validation/login.js
const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = data => {
  let errors = {}
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  
  // Email
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }

  
  // Password
  if(!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = 'Password must have 6 chars'
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}