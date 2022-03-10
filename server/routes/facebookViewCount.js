const express = require('express'),
  router = express.Router(),
  { default: axios } = require('axios')

require('dotenv').config()

router.post('/api/facebook/view-count', async (req, res) => {
  // curl -i -X GET \
  //  `https://graph.facebook.com/v13.0/${facebookLiveVideoId}?fields=live_views&access_token=${facebookAccessToken}`

  const facebookLiveVideoId = req.body.facebookLiveVideoId
  const facebookAccessToken = req.body.facebookAccessToken

  let viewCount = await axios
    .get(
      `https://graph.facebook.com/v13.0/${facebookLiveVideoId}?fields=live_views&access_token=${facebookAccessToken}`
    )
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log(err)
    })

  return res.status(201).send({ views: 'views' })
})

module.exports = router
