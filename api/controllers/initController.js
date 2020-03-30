const got = require('got')

init = async (url) => {
  let response = ''
  try {
    response = await got(url)
  } catch (err) {
    throw new Error()
  }
  return response
}

module.exports = init