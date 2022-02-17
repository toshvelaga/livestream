require('dotenv').config()

const { default: axios } = require('axios'),
  express = require('express'),
  router = express.Router()

router.post('/api/hubspot', async (req, res) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = {
    properties: [
      { property: 'email', value: 'testingapis2@hubspot.com' },
      { property: 'firstname', value: 'test' },
    ],
  }

  const hb = await axios
    .post(
      `https://api.hubapi.com/contacts/v1/contact/?hapikey=${process.env.HUBSPOT_API_KEY}`,
      body,
      config
    )
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((error) => {
      console.log(error)
    })

  return res.status(201).send(hb)
})

module.exports = router
