const cheerio = require('cheerio')
const requestImageSize = require('request-image-size');

pictures = async (data) => {
  const $ = cheerio.load(data.website)
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
    }
  }
  console.log("returning", {numberOfPictures: websiteImages.length, largestImage: largestImage})
  return {numberOfPictures: websiteImages.length, largestImage: largestImage}
}

module.exports = pictures