const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const init = require('../controllers/initController')

router.post('/', async function(req, res, next) {
  const Url = req.body.url
  let response = {}

  try{
    response = await init(req.body.url)
  } catch (err) {
    res.status(404).send()
    return
  }

  const data = {website: response.body, url: Url, timings: response.timings}
  //2. The page title 
  const $ = cheerio.load(response.body)
  res.send({title: $('title').text(), data: data})
})

module.exports = router