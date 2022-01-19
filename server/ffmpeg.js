const inputSettings = ['-i', '-', '-v', 'error']

const twitchSettings = (twitch) => {
  if (twitch) {
    return [
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
    ]
  } else return []
}

const youtubeSettings = (youtube) => {
  if (youtube && youtube !== 'undefined') {
    return [
      // video codec config: low latency, adaptive bitrate
      '-c:v',
      'libx264',
      '-preset',
      'veryfast',
      '-tune',
      'zerolatency',
      '-g:v',
      '60',

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
      youtube,
    ]
  } else return []
}

const facebookSettings = (facebook) => {
  if (facebook && facebook !== 'undefined') {
    return [
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
      facebook,
    ]
  } else return []
}

const customRtmpSettings = (customRTMP) => {
  if (customRTMP && customRTMP !== 'undefined') {
    return [
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
      customRTMP,
    ]
  } else return []
}

module.exports.inputSettings = inputSettings
module.exports.twitchSettings = twitchSettings
module.exports.youtubeSettings = youtubeSettings
module.exports.facebookSettings = facebookSettings
module.exports.customRtmpSettings = customRtmpSettings
