const express = require('express'),
  router = express.Router(),
  pool = require('../db'),
  { default: axios } = require('axios')
require('dotenv').config()

router.post('/api/authorize/facebook', async (req, res) => {
  // fB docs: https://developers.facebook.com/docs/pages/access-tokens/

  console.log('get long facebook token')
})

module.exports = router
