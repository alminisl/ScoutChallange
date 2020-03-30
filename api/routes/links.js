const express = require('express')
const router = express.Router()
const getLinks = require('../controllers/linksController')

router.post('/', async function (req, res, next) {
  let links = {}
  try {
    links = await getLinks(req.body)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }

  res.send(links)
});

module.exports = router;