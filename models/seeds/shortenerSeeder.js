const Shortener = require('../shortener')
// 使用NanoID來產生短網址
const { customAlphabet } = require('nanoid');
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const upperCaseLetters = lowerCaseLetters.toUpperCase()
const numbers = '1234567890'
const nanoid = customAlphabet(lowerCaseLetters + upperCaseLetters + numbers, 5)

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')

function uniqueNanoId() {
  const nanoId = nanoid()
  Shortener.findOne({ url_transform: nanoId })
    .lean()
    .then(response => {
      if (response) {
        uniqueNanoId()
      }
    })
    .catch(error => console.log(error))
  return nanoId
}

db.once('open', () => {
  Shortener.create(
    { url: 'https://www.google.com', url_transform: uniqueNanoId() },
    { url: 'https://www.facebook.com', url_transform: uniqueNanoId() },
    { url: 'https://developer.mozilla.org/zh-TW/', url_transform: uniqueNanoId() })
  console.log('done')
})