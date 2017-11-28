require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

app.use('/', cors())
app.use(bodyParser.json())

app.use('/', routes)

app.listen(process.env.APP_PORT)
console.log(`APP LISTEN ON ${process.env.APP_PORT}`)