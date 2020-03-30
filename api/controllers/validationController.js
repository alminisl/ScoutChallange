const cheerio = require('cheerio')
const validate = require('html-validator')

validation = async (data) => {
  const $ = cheerio.load(data.website)
  let HtmlValidation = ''
  let HtmlVersion = "HTML 5"
  let errors = []

  const options = {
      format: 'json',
      data: data.website,
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

    return {headingsArray: headingsArray, errors: errors, HtmlVersion: HtmlVersion}
}

module.exports = validation