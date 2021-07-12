const child_process = require('child_process') // To be used later for running FFmpeg
const express = require('express')
const http = require('http')
const WebSocketServer = require('ws').Server
// const NodeMediaServer = require('node-media-server')

const app = express()
const server = http.createServer(app).listen(3000, () => {
  console.log('Listening...')
})

// Serve static files out of the www directory, where we will put our HTML page
app.use(express.static('../www'))

const wss = new WebSocketServer({
  server: server,
})

wss.on('connection', (ws, req) => {
  // Ensure that the URL starts with '/rtmp/', and extract the target RTMP URL.
  let match
  if (!(match = req.url.match(/^\/rtmp\/(.*)$/))) {
    ws.terminate() // No match, reject the connection.
    return
  }

  const rtmpUrl = decodeURIComponent(match[1])
  console.log('Target RTMP URL:', rtmpUrl)

  // Launch FFmpeg to handle all appropriate transcoding, muxing, and RTMP.
  // If 'ffmpeg' isn't in your path, specify the full path to the ffmpeg binary.
  const ffmpeg = child_process.spawn('ffmpeg', [
    // Facebook requires an audio track, so we create a silent one here.
    // Remove this line, as well as `-shortest`, if you send audio from the browser.
    '-f',
    'lavfi',
    '-i',
    'anullsrc',

    // FFmpeg will read input video from STDIN
    '-i',
    '-',

    // Because we're using a generated audio source which never ends,
    // specify that we'll stop at end of other input.  Remove this line if you
    // send audio from the browser.
    '-shortest',

    // If we're encoding H.264 in-browser, we can set the video codec to 'copy'
    // so that we don't waste any CPU and quality with unnecessary transcoding.
    // If the browser doesn't support H.264, set the video codec to 'libx264'
    // or similar to transcode it to H.264 here on the server.
    '-vcodec',
    'copy',

    // AAC audio is required for Facebook Live.  No browser currently supports
    // encoding AAC, so we must transcode the audio to AAC here on the server.
    '-acodec',
    'aac',

    // FLV is the container format used in conjunction with RTMP
    '-f',
    'flv',

    // The output RTMP URL.
    // For debugging, you could set this to a filename like 'test.flv', and play
    // the resulting file with VLC.  Please also read the security considerations
    // later on in this tutorial.
    rtmpUrl,
  ])

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
    ffmpeg.kill('SIGINT')
  })
})

// const config = {
//   rtmp: {
//     port: 1935,
//     chunk_size: 60000,
//     gop_cache: true,
//     ping: 30,
//     ping_timeout: 60,
//   },
//   http: {
//     port: 8000,
//     allow_origin: '*',
//   },
// }

// var nms = new NodeMediaServer(config)
// nms.run()
