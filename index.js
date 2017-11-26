require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

app.use(cors({ credentials: true }))
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: process.env.SESSION_AGE,
    },
    resave: false,
    saveUninitialized: false,
  })
)

app.use('/', routes)

app.listen(process.env.APP_PORT)
console.log(`APP LISTEN ON ${process.env.APP_PORT}`)