const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const requestImageSize = require('request-image-size');



router.post('/', async function(req, res, next) {
  const $ = cheerio.load(req.body.website)

  // //4. The number of pictures and the largest one
  const largestImage = {height: 0, width: 0, url: ''}
  const websiteImages = $('img')
  
  for(let i = 0; i < websiteImages.length; i ++) {
    let imageSrc = $(websiteImages[i]).attr('src')
    if (imageSrc) {
      try {

        // remove everything from <a> after ? 
        if (imageSrc.indexOf('?') !== -1)
          imageSrc = imageSrc.split('?')[0]
        const size = await requestImageSize(imageSrc, {
          headers: {
            'User-Agent': 'request-image-size'
          }
        })

        if(largestImage.height < size.height && largestImage.width < size.width) {
          largestImage.height = size.height
          largestImage.width = size.width
          largestImage.url = imageSrc
        }
      } catch (err) {
        console.log('FAILED SRC: ', imageSrc)
        console.log("Error fetching picture sizes", err)
      }
    } else {
      console.log("No Image Src")
      res.status(500)
    }
  }

  res.send({numberOfPictures: websiteImages.length, largestImage: largestImage})
});

module.exports = router;

