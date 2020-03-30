const url = 'https://www.immobilienscout24.at/'
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../tests/test.html'), 'utf8');
const inputObj = {website: html, url: url}
const cheerio = require('cheerio')

const validation = require('../controllers/validationController')
const pictures = require('../controllers/picturesController')
const links = require('../controllers/linksController')


test('Test init API call', async () => {
  const $ = cheerio.load(inputObj.website)
  expect($('title').text()).toContain('Immobilien, Wohnungen und Häuser auf ImmobilienScout24')
  expect(inputObj.url).toContain('https://www.immobilienscout24.at')
})


test('Test validation API call', async () => {
  const response = await validation(inputObj)
  expect(response.headingsArray).toEqual([{ h1: 1 }, { h2: 1 }, { h3: 12 }, { h4: 4 }, { h5: 0 },{ h6: 0 }])
  expect(response.errors.length).toBe(3)
})

test('Test pictures API call', async () => {
  const response = await pictures(inputObj)
  expect(response.numberOfPictures).toBe(4)
})

test('Test links API call', async () => {
  const response = await links(inputObj)
  expect(response.numberOfLinks).toBe(112)
  expect(response.internalLinks.length).toBe(83)
  expect(response.externalLinks.length).toBe(18)
})