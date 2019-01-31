// backend/config/passport.js
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt


// Model
const mongoose = require('mongoose')
const User = mongoose.model('users')


// Passport Options
const opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'

module.exports = passport => {
  passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id)

      return user
        ? done(null, user)
        : done(null, false)
    } catch(err) {
      console.error(err)
    }
  }))
}