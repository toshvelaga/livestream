const express = require('express'),
  router = express.Router(),
  { default: axios } = require('axios')

require('dotenv').config()

router.post('/api/youtube/view-count', async (req, res) => {
  // https://developers.google.com/youtube/v3/docs/videos/list?apix=true&apix_params=%7B%22part%22%3A%5B%22statistics%2C%20status%22%5D%2C%22id%22%3A%5B%22_IrFoihwTUc%22%5D%7D#parameters

  const youtubeBroadcastId = req.body.youtubeBroadcastId
  const youtubeAccessToken = req.body.youtubeAccessToken

  let viewCount = await axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=statistics%2C%20status&id=${youtubeBroadcastId}&key=${process.env.GOOGLE_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${youtubeAccessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      console.log(res.data.items)
      return res
    })
    .catch((err) => {
      console.log(err)
    })

  return res.status(201).send({ data: 'data' })
})

module.exports = router
