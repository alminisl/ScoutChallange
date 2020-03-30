const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')

router.post('/', function(req, res, next) {
  // //5. Internal links and their count
  const $ = cheerio.load(req.body.website)
  const websiteLinks = $('a')
  const externalLinks = []
  const internalLinks = []
  
  for(let i = 0; i < websiteLinks.length; i++) {
    let link = $(websiteLinks[i]).attr('href')

    //INFO: If there is a link without a href, skip it
    if(!link) {
      continue
    }

    console.log(link)
    console.log(req.body.url)
    console.log(link.startsWith('/'))
    console.log(link.includes(req.body.url))

    if(link.startsWith('/') || link.includes(req.body.url) || link.includes(req.body.url.replace('www.', ''))) {
      internalLinks.push(link)
    } else {
      externalLinks.push(link)
    }
  }

  res.send({numberOfLinks: websiteLinks.length, internalLinks: internalLinks, externalLinks: externalLinks})
});

module.exports = router;