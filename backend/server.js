// backend/server.js
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

// Config
const config = require('./config/connection')


// Routes
const userRoutes = require('./routes/user')


// DB Connection
mongoose.connect(config.connect, { useNewUrlParser: true, useFindAndModify: false })

const db = mongoose.connection
db.on('error', console.error.bind(`Cannot connect to the database: ${console}`))
db.once('open', () => console.log('Database is connected'))


// Passport
app.use(passport.initialize())
require('./config/passport')(passport)


// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// App Routes
app.use('/api/users', userRoutes)


// Init
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})