const express = require('express')
const router = express.Router()
const Shortener = require('../../models/shortener')

// 使用NanoID來產生短網址
const { customAlphabet } = require('nanoid');
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const upperCaseLetters = lowerCaseLetters.toUpperCase()
const numbers = '1234567890'
const nanoid = customAlphabet(lowerCaseLetters + upperCaseLetters + numbers, 5)

// 產生不重複shorten url
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

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  // 檢查是否資料庫有此URL
  console.log(req.body)
  Shortener.exists(req.body, function (err, result) {
    if (err) {
      console.log('error')

    } else {
      if (result) { // 如果存在的話，沿用既有的shorten URL
        res.render('index')
      } else { // 如果不存在的話，產生一筆不重複shorten url
        let url_transform = uniqueNanoId()
        Shortener.create({ url: req.body.url, url_transform})
        res.render('success', { url_transform })
      }
    }
  })
})

module.exports = router