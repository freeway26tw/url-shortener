const express = require('express')
const router = express.Router()
const Shortener = require('../../models/shortener')

// 若要使用NanoID來產生短網址
// const { customAlphabet } = require('nanoid');
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const upperCaseLetters = lowerCaseLetters.toUpperCase()
const numbers = '1234567890'
// const nanoid = customAlphabet(lowerCaseLetters + upperCaseLetters + numbers, 5)

function generateRandomId(n) {
  let newId = ''
  for (let i = 0; i < n; i++) {
    let allCharacter = [...lowerCaseLetters, ...upperCaseLetters, ...numbers]
    newId += allCharacter[Math.floor(Math.random() * allCharacter.length)]
  }
  return newId
}

// 產生不重複shorten url
function uniqueNanoId() {
  const nanoId = generateRandomId(5)
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

router.get('/:url_shorten', (req, res) => {
  const url_shorten = req.params.url_shorten
  Shortener.findOne({ url_transform: url_shorten })
    .then(response => res.redirect(response.url))
    .catch(error => {
      console.log(error)
      res.render('error')
    })
})

router.post('/', (req, res) => {
  // 檢查是否資料庫有此URL
  Shortener.exists(req.body, function (err, result) {
    if (err) {
      console.log('error')
      res.render('error')
    } else {
      if (result) { // 如果存在的話，沿用既有的shorten URL
        Shortener.findOne({ url: req.body.url })
          .then(response => res.render('success', { url_transform: response.url_transform, host: req.headers.host }))
          .catch(error => {
            console.log(error)
            res.render('error')
          })

      } else { // 如果不存在的話，產生一筆不重複shorten url
        let url_transform = uniqueNanoId()
        Shortener.create({ url: req.body.url, url_transform })
        res.render('success', { url_transform, host: req.headers.host })
      }
    }
  })
})

module.exports = router