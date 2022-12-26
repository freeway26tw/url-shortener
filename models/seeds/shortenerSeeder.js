const Shortener = require('../shortener')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')


db.once('open', () => {
  Shortener.create(
    { url: 'https://www.google.com', url_transform: '6y7UP' },
    { url: 'https://www.facebook.com', url_transform: 'jcm83' },
    { url: 'https://www.google.com', url_transform: 'Ecp3Y' })
  console.log('done')
})