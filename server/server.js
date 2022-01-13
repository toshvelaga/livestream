const child_process = require('child_process') // To be used later for running FFmpeg
const express = require('express')
const WebSocket = require('ws')
const app = express()
const cors = require('cors')
const path = require('path')
const stripe = require('stripe')(
  'sk_test_51KHCx1GYm8Ujy0UZE1heg7ga8ZxcWg6ZvzfmT9toFbnEBW1cjs4Wv29jZ9rnQ56mXSn7pgfqgaZpBToK0g8gFDgA00c7N57qef'
)

require('dotenv').config()

const {
  inputSettings,
  twitchSettings,
  youtubeSettings,
  facebookSettings,
} = require('./ffmpeg')

const { ffmpeg2 } = require('./ffmpeg2')

app.use(cors())
app.use(express.static('public'))
app.use(express.json({ limit: '200mb', extended: true }))
app.use(
  express.urlencoded({ limit: '200mb', extended: true, parameterLimit: 50000 })
)

const authenticationRouter = require('./routes/authentication')
const broadcastsRouter = require('./routes/broadcasts')
const compareCodeRouter = require('./routes/compareCode')
const destinationsRouter = require('./routes/destinations')
const referralRouter = require('./routes/referral')
const facebookAuthorizationRouter = require('./routes/facebookAuthorization')
const facebookBroadcastRouter = require('./routes/facebookBroadcast')
const twitchAuthorizationRouter = require('./routes/twitchAuthorization')
const twitchBroadcastRouter = require('./routes/twitchBroadcast')
const youtubeAuthorizationRouter = require('./routes/youtubeAuthorization')
const youtubeBroadcastRouter = require('./routes/youtubeBroadcast')

app.use('/', authenticationRouter)
app.use('/', broadcastsRouter)
app.use('/', compareCodeRouter)
app.use('/', destinationsRouter)
app.use('/', facebookAuthorizationRouter)
app.use('/', facebookBroadcastRouter)
app.use('/', twitchAuthorizationRouter)
app.use('/', twitchBroadcastRouter)
app.use('/', referralRouter)
app.use('/', youtubeAuthorizationRouter)
app.use('/', youtubeBroadcastRouter)

const PORT = process.env.PORT || 5001
const WS_PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} for REST API requests`)
})

const YOUR_DOMAIN = 'http://localhost:3000'

app.post('/create-checkout-session', async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ['data.product'],
  })
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  })

  res.redirect(303, session.url)
})

app.post('/create-portal-session', async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  })

  res.redirect(303, portalSession.url)
})

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    const event = request.body
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = 'whsec_12345'
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature']
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        )
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message)
        return response.sendStatus(400)
      }
    }
    let subscription
    let status
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.trial_will_end':
        subscription = event.data.object
        status = subscription.status
        console.log(`Subscription status is ${status}.`)
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break
      case 'customer.subscription.deleted':
        subscription = event.data.object
        status = subscription.status
        console.log(`Subscription status is ${status}.`)
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break
      case 'customer.subscription.created':
        subscription = event.data.object
        status = subscription.status
        console.log(`Subscription status is ${status}.`)
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break
      case 'customer.subscription.updated':
        subscription = event.data.object
        status = subscription.status
        console.log(`Subscription status is ${status}.`)
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`)
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send()
  }
)

const wss = new WebSocket.Server({ port: WS_PORT }, () => {
  console.log(`Listening on PORT ${WS_PORT} for websockets`)
})

wss.on('connection', (ws, req) => {
  const myURL = new URL(`http://localhost:${WS_PORT}` + req.url)

  const youtube = myURL.searchParams.get('youtubeUrl')
  const twitchStreamKey = myURL.searchParams.get('twitchStreamKey')
  const twitch =
    twitchStreamKey !== 'null'
      ? 'rtmp://dfw.contribute.live-video.net/app/' + twitchStreamKey
      : null
  const facebook = myURL.searchParams.get('facebookUrl')

  const ffmpegInput = inputSettings.concat(
    youtubeSettings(youtube),
    twitchSettings(twitch),
    facebookSettings(facebook)
  )

  // const ffmpeg = child_process.spawn(
  //   'ffmpeg',
  //   ffmpeg2(youtube, twitch, facebook)
  // )
  const ffmpeg = child_process.spawn('ffmpeg', ffmpegInput)

  // If FFmpeg stops for any reason, close the WebSocket connection.
  ffmpeg.on('close', (code, signal) => {
    console.log(
      'FFmpeg child process closed, code ' + code + ', signal ' + signal
    )
    ws.terminate()
  })

  // Handle STDIN pipe errors by logging to the console.
  // These errors most commonly occur when FFmpeg closes and there is still
  // data to write.  If left unhandled, the server will crash.
  ffmpeg.stdin.on('error', (e) => {
    console.log('FFmpeg STDIN Error', e)
  })

  // FFmpeg outputs all of its messages to STDERR.  Let's log them to the console.
  ffmpeg.stderr.on('data', (data) => {
    console.log('FFmpeg STDERR:', data.toString())
  })

  // When data comes in from the WebSocket, write it to FFmpeg's STDIN.
  ws.on('message', (msg) => {
    console.log('DATA', msg)
    ffmpeg.stdin.write(msg)
  })

  // If the client disconnects, stop FFmpeg.
  ws.on('close', (e) => {
    console.log('kill: SIGINT')
    ffmpeg.kill('SIGINT')
  })
})
