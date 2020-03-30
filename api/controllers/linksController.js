const cheerio = require('cheerio')

links = async (data) => {
  // //5. Internal links and their count
  const $ = cheerio.load(data.website)
  const websiteLinks = $('a')
  const externalLinks = []
  const internalLinks = []

  for (let i = 0; i < websiteLinks.length; i++) {
    let link = $(websiteLinks[i]).attr('href')
    let url = data.url
    //INFO: If there is a link without a href, skip it
    if (!link) {
      continue
    }

    /* 
      This here fixes the issue If we have an url with or without www.
      issue was that if you have www in the url, it would categorise links without www as external, 
      which is not right.
    */
    const length = link.includes('https://') ? 8 : 7
    let urlWww = ''

    if (url.includes('www.')) {
      urlWww = url.replace('www.', '')
    } else {
      urlWww = url.substring(0, length) + 'www.' + url.substring(length, url.length)
    }

    if (link.startsWith('/') || link.includes(data.url) || link.includes(urlWww)) {
      internalLinks.push(link)
    } else {
      externalLinks.push(link)
    }
  }


  return { numberOfLinks: websiteLinks.length, internalLinks: internalLinks, externalLinks: externalLinks }
}

module.exports = links