const express = require('express'),
  router = express.Router(),
  { default: axios } = require('axios')

require('dotenv').config()

// https://developers.facebook.com/tools/explorer/?method=GET&path=277883987824653%3Ffields%3Dlive_views&version=v13.0

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
      console.log(res.data.live_views)
      return res.data.live_views
    })
    .catch((err) => {
      console.log(err)
    })

  return res.status(201).send({ views: viewCount })
})

module.exports = router
