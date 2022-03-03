const child_process = require('child_process') // To be used later for running FFmpeg
const express = require('express')
// const WebSocket = require('ws')
const { Server } = require('socket.io')
const app = express()
const cors = require('cors')
const path = require('path')
const tmi = require('tmi.js')

require('dotenv').config()

const {
  inputSettings,
  twitchSettings,
  youtubeSettings,
  facebookSettings,
  customRtmpSettings,
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
const emailEventNotificationsRouter = require('./routes/emailEventNotifications')
const hubspotRouter = require('./routes/hubspot')
const referralRouter = require('./routes/referral')
const stripeRouter = require('./routes/stripe')
const facebookAuthorizationRouter = require('./routes/facebookAuthorization')
const facebookBroadcastRouter = require('./routes/facebookBroadcast')
const twitchAuthorizationRouter = require('./routes/twitchAuthorization')
const twitchBroadcastRouter = require('./routes/twitchBroadcast')
const twitchViewCountRouter = require('./routes/twitchViewCount')
const youtubeAuthorizationRouter = require('./routes/youtubeAuthorization')
const youtubeBroadcastRouter = require('./routes/youtubeBroadcast')

app.use('/', authenticationRouter)
app.use('/', broadcastsRouter)
app.use('/', compareCodeRouter)
app.use('/', destinationsRouter)
app.use('/', emailEventNotificationsRouter)
app.use('/', facebookAuthorizationRouter)
app.use('/', facebookBroadcastRouter)
app.use('/', hubspotRouter)
app.use('/', twitchAuthorizationRouter)
app.use('/', twitchBroadcastRouter)
app.use('/', twitchViewCountRouter)
app.use('/', referralRouter)
app.use('/', stripeRouter)
app.use('/', youtubeAuthorizationRouter)
app.use('/', youtubeBroadcastRouter)

const PORT = process.env.PORT || 5001
const WS_PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} for REST API requests`)
})

// const wss = new WebSocket.Server({ port: WS_PORT }, () => {
//   console.log(`Listening on PORT ${WS_PORT} for websockets`)
// })

const io = new Server(WS_PORT, {
  /* options */
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log(`socket connected to ${socket.id}`)

  const socketQueryParams = socket.handshake.query

  const youtube = socketQueryParams.youtubeUrl
  const twitchStreamKey = socketQueryParams.twitchStreamKey
  const twitch =
    twitchStreamKey !== 'null'
      ? 'rtmp://dfw.contribute.live-video.net/app/' + twitchStreamKey
      : null
  const facebook = socketQueryParams.facebookUrl

  const customRTMP = socketQueryParams.customRTMP
  console.log('custom RTMP: ' + customRTMP)

  const ffmpegInput = inputSettings.concat(
    youtubeSettings(youtube),
    twitchSettings(twitch),
    facebookSettings(facebook),
    customRtmpSettings(customRTMP)
  )

  console.log(ffmpegInput)

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
    // ws.terminate()
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
  socket.on('message', (msg) => {
    console.log('DATA', msg)
    ffmpeg.stdin.write(msg)
  })

  // If the client disconnects, stop FFmpeg.
  socket.conn.on('close', (e) => {
    console.log('kill: SIGINT')
    ffmpeg.kill('SIGINT')
  })
})

const client = new tmi.Client({
  channels: ['toshvelaga'],
})

client.connect()

client.on('message', (channel, tags, message, self) => {
  // "Alca: Hello, World!"
  console.log(`${tags['display-name']}: ${message}`)
})
