const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const validate = require('html-validator')

router.post('/',async function (req, res, next) {
  // 1.The HTML version of the document 
  const $ = cheerio.load(req.body.website)

  let HtmlValidation = ''
  let HtmlVersion = "HTML 5"
  let errors = []

  const options = {
      format: 'json',
      data: req.body.website,
      validator: 'WHATWG',
  }

  try {
    HtmlValidation = await validate(options)
    errors = HtmlValidation.errors
    errors.find(error => { if(error.ruleId === 'doctype-html') HtmlVersion = "HTML Legacy Version"})
  } catch (error) {
    console.log("Validation Error", error)
    res.send('Error')
  }

  // //3. The number of headings and their level
  let headingsArray = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  headingsArray = headingsArray.map((heading) => {
     return {[heading]: $(heading).length}
  })

  res.send({headingsArray: headingsArray, errors: errors, HtmlVersion: HtmlVersion})
});

module.exports = router;