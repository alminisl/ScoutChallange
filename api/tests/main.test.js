const fetch = require('node-fetch')

const apiUrl = 'http://localhost:9000/'
const url = 'https://www.immobilienscout24.at/'
let dataObj = {}

test('Test init API call', async () => {
  
  const response = await fetch(apiUrl + 'init',  {
    method: 'POST',
    body: JSON.stringify({url: url}),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  
  const responseData = await response.json()
  dataObj = responseData.data
  expect(responseData.title).toContain('Immobilien, Wohnungen und Häuser auf ImmobilienScout24')
  expect(responseData.data.url).toContain(url)
})


test('Test validation API call', async () => {
  
  const response = await fetch(apiUrl + 'validation',  {
    method: 'POST',
    body: JSON.stringify(dataObj),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  
  const validation = await response.json()
  expect(validation.headingsArray).toEqual([{ h1: 1 }, { h2: 1 }, { h3: 12 }, { h4: 4 }, { h5: 0 },{ h6: 0 }])
  expect(validation.errors.length).toBe(8)
})

test('Test pictures API call', async () => {
  
  const response = await fetch(apiUrl + 'pictures',  {
    method: 'POST',
    body: JSON.stringify(dataObj),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  
  const pictures = await response.json()
  expect(pictures.numberOfPictures).toBe(4)
  expect(pictures.largestImage.height).toBe(203)
  expect(pictures.largestImage.width).toBe(359)
})

test('Test links API call', async () => {
  
  const response = await fetch(apiUrl + 'links',  {
    method: 'POST',
    body: JSON.stringify(dataObj),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  
  const links = await response.json()
  expect(links.numberOfLinks).toBe(112)
})