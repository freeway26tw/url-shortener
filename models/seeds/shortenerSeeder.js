const mongoose = require('mongoose')
const Shortener = require('../Shortener')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Shortener.create(
    { url: 'https://www.google.com', url_transform: '6y7UP' },
    { url: 'https://www.facebook.com', url_transform: 'jcm83' },
    { url: 'https://www.google.com', url_transform: 'Ecp3Y' })
  console.log('done')
})