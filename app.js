const express = require('express')
const exphbs = require('express-handlebars')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ default: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(routes)

app.listen(3000, () => {
  console.log('App is runnig on http://localhost:3000')
})