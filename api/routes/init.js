const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const got = require('got')

// const Url= 'https://www.w3.org/1999/xhtml/'

router.post('/', async function(req, res, next) {
  const Url = req.body.url
  let response = ''

  try {
    response = await got(Url)
  } catch (err) {
    console.log('Error', err)
    res.status(404).send({title: 'Error'})
  }
  
  const data = {website: response.body, url: Url, timings: response.timings}

  //2. The page title 
  const $ = cheerio.load(response.body)
  res.send({title: $('title').text(), data: data})
})

module.exports = router