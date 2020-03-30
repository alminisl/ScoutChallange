const express = require('express')
const router = express.Router()
const getPictures = require('../controllers/picturesController')

router.post('/', async function(req, res, next) {
  
  let pictures = {}
  try {
    pictures = await getPictures(req.body)
  } catch (err) {
    res.status(500).send(err)
    return
  }
  res.send(pictures)
});

module.exports = router;

