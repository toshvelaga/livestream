require('dotenv').config()

const { default: axios } = require('axios'),
  express = require('express'),
  router = express.Router()

// OLD DOCS = https://legacydocs.hubspot.com/docs/methods/contacts/create_contact

// NEW DOCS = https://developers.hubspot.com/docs/api/crm/contacts

router.post('/api/hubspot', async (req, res) => {
  const { email } = req.body
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = {
    properties: { email: email },
  }
  const hb = await axios
    .post(
      `https://api.hubapi.com/crm/v3/objects/contacts?hapikey=${process.env.HUBSPOT_API_KEY}`,
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

  return res.status(201).send(`user ${email} added to hubspot`)
})

module.exports = router
