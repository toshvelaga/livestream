const child_process = require('child_process') // To be used later for running FFmpeg
const express = require('express')
const WebSocket = require('ws')
const app = express()
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const {
  inputSettings,
  twitchSettings,
  youtubeSettings,
  facebookSettings,
} = require('./ffmpeg')

app.use(cors())

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

const wss = new WebSocket.Server({ port: WS_PORT }, () => {
  console.log(`Listening on PORT ${WS_PORT} for websockets`)
})

wss.on('connection', (ws, req) => {
  const myURL = new URL(`http://localhost:${WS_PORT}` + req.url)

  const twitchStreamKey = myURL.searchParams.get('twitchStreamKey')
  const twitch = 'rtmp://dfw.contribute.live-video.net/app/' + twitchStreamKey
  const youtube = myURL.searchParams.get('youtubeUrl')
  const facebook = myURL.searchParams.get('facebookUrl')

  const ffmpegInput = inputSettings.concat(
    twitchSettings(twitch),
    youtubeSettings(youtube),
    facebookSettings(facebook)
  )

  console.log(ffmpegInput)

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
