const { default: axios } = require('axios')
require('dotenv').config()

const hubspot = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const hb = await axios
    .post(
      `https://api.hubapi.com/contacts/v1/contact/`,
      {
        params: {
          hapikey: 'demo',
        },
      },
      config
    )
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((error) => {
      console.log(error)
    })

  return hb
}

module.exports = hubspot
