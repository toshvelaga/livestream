const { default: axios } = require('axios')
require('dotenv').config()

router.post('/api/hubspot', async (req, res) => {
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
})

module.exports = router
