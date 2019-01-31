// backend/validation/user.js

const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports.validateAddUserInput = data => {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : ''

  
  // Name
  if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.username = 'Username must be between 2 to 30 chars'
  }

  if(Validator.isEmpty(data.username)) {
    errors.username = 'Username is required'
  }

  if(Validator.isEmpty(data.firstname)) {
    errors.username = 'First name is required'
  }

  if(Validator.isEmpty(data.firstname)) {
    errors.username = 'Last name is required'
  }

  
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

  if(!Validator.isLength(data.password_confirm, {min: 6, max: 30})) {
    errors.password_confirm = 'Password must have 6 chars'
  }

  if(!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = 'Password and Confirm Password must match'
  }

  if(Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = 'Password is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}