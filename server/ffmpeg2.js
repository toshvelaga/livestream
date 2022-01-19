const ffmpeg2 = (youtube, twitch, facebook, customRTMP) => {
  return [
    '-i',
    '-',
    // select first stream intended for output
    '-map',
    '0',
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

    '-flags',
    '+global_header',
    '-f',
    'tee',
    `[f=flv:onfail=ignore]${youtube}|[f=flv:onfail=ignore]${twitch}|[f=flv:onfail=ignore]${facebook}|[f=flv:onfail=ignore]${customRTMP}`,
  ]
}

module.exports.ffmpeg2 = ffmpeg2
