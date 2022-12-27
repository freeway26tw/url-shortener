const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('hbs', exphbs({ default: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(routes)
// setting static files
app.use(express.static('public'))

app.listen(3000, () => {
  console.log('App is runnig on http://localhost:3000')
})