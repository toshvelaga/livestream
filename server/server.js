const child_process = require('child_process') // To be used later for running FFmpeg
const express = require('express')
const WebSocket = require('ws')
const app = express()
const cors = require('cors')
const path = require('path')
require('dotenv').config()

app.use(cors())

app.use(express.json({ limit: '200mb', extended: true }))
app.use(
  express.urlencoded({ limit: '200mb', extended: true, parameterLimit: 50000 })
)

const authenticationRouter = require('./routes/authentication')
const authorizationRouter = require('./routes/authorization')
const broadcastsRouter = require('./routes/broadcasts')
const compareCodeRouter = require('./routes/compareCode')
const referralRouter = require('./routes/referral')
const facebookBroadcastRouter = require('./routes/facebookBroadcast')
// const twitchBroadcastRouter = require('./routes/twitchBroadcast')

app.use('/', authenticationRouter)
app.use('/', authorizationRouter)
app.use('/', broadcastsRouter)
app.use('/', compareCodeRouter)
app.use('/', facebookBroadcastRouter)
// app.use('/', twitchBroadcastRouter)
app.use('/', referralRouter)

if (process.env.NODE_ENV === 'production') {
  // serve static content
  // npm run build
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

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

  const youtubeUrl = myURL.searchParams.get('youtubeUrl')

  const facebookUrl = myURL.searchParams.get('facebookUrl')
  console.log(facebookUrl)

  const ffmpeg = child_process.spawn('ffmpeg', [
    '-i',
    '-',

    // video codec config: low latency, adaptive bitrate
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-tune',
    'zerolatency',

    // audio codec config: sampling frequency (11025, 22050, 44100), bitrate 64 kbits
    '-c:a',
    'aac',
    '-strict',
    '-2',
    '-ar',
    '44100',
    '-b:a',
    '64k',

    //force to overwrite
    '-y',

    // used for audio sync
    '-use_wallclock_as_timestamps',
    '1',
    '-async',
    '1',

    //'-filter_complex', 'aresample=44100', // resample audio to 44100Hz, needed if input is not 44100
    //'-strict', 'experimental',
    '-bufsize',
    '1000',
    '-f',
    'flv',
    twitch,

    // video codec config: low latency, adaptive bitrate
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-tune',
    'zerolatency',

    // audio codec config: sampling frequency (11025, 22050, 44100), bitrate 64 kbits
    '-c:a',
    'aac',
    '-strict',
    '-2',
    '-ar',
    '44100',
    '-b:a',
    '64k',

    //force to overwrite
    '-y',

    // used for audio sync
    '-use_wallclock_as_timestamps',
    '1',
    '-async',
    '1',

    '-f',
    'flv',
    youtubeUrl,

    // video codec config: low latency, adaptive bitrate
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-tune',
    'zerolatency',

    // audio codec config: sampling frequency (11025, 22050, 44100), bitrate 64 kbits
    '-c:a',
    'aac',
    '-strict',
    '-2',
    '-ar',
    '44100',
    '-b:a',
    '64k',

    //force to overwrite
    '-y',

    // used for audio sync
    '-use_wallclock_as_timestamps',
    '1',
    '-async',
    '1',

    '-f',
    'flv',
    facebookUrl,
  ])

  // If FFmpeg stops for any reason, close the WebSocket connection.

  // ffmpeg.on('close', (code, signal) => {
  //   console.log(
  //     'FFmpeg child process closed, code ' + code + ', signal ' + signal
  //   )
  //   ws.terminate()
  // })

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
