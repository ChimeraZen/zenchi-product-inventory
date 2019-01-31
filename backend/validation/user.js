// backend/validation/user.js

const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = data => {
  let errors = {}
  data.username = !isEmpty(data.username) ? data.username : ''
  data.firstname = !isEmpty(data.firstname) ? data.firstname : ''
  data.lastname = !isEmpty(data.lastname) ? data.lastname : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : ''

  
  // Name
  if(!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Username must be between 2 to 30 chars'
  }

  if(Validator.isEmpty(data.username)) {
    errors.username = 'Username is required'
  }

  if(Validator.isEmpty(data.firstname)) {
    errors.firstname = 'First name is required'
  }

  if(Validator.isEmpty(data.lastname)) {
    errors.lastname = 'Last name is required'
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

  if(!Validator.isLength(data.passwordConfirm, {min: 6, max: 30})) {
    errors.passwordConfirm = 'Password must have 6 chars'
  }

  if(!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = 'Password and Confirm Password must match'
  }

  if(Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = 'Password is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}