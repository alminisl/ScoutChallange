const express = require('express')
const router = express.Router()
const validation = require('../controllers/validationController')

router.post('/',async function (req, res, next) {
  let validate = {}
  try {
    validate = await validation(req.body)
  } catch (err) {
    res.status(500).send(err)
    return
  }
  res.send(validate)
})

module.exports = router;