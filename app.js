'use strict'
// 导入依赖
let express = require('express')
let app = express()
let path = require('path')
let bodyParser = require('body-parser')
let flash = require('connect-flash')
let log4js = require('log4js')

// 导入组件
let routes = require('./app/routes')
let session = require('./app/session')
let passport = require('./app/auth')
let ioServer = require('./app/socket')(app)
let logger = require('./app/logger')

// Set the port number
let port = process.env.PORT || 3000

// View engine setup
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs') // Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use(session)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/', routes)

// Middleware to catch 404 errors
app.use(function (req, res, next) {
  res.status(404).sendFile(process.cwd() + '/app/views/404.htm')
})

ioServer.listen(port)

