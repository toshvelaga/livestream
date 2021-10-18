export const SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl'

export const TWITCH_SCOPE = encodeURIComponent(
  'channel:manage:broadcast channel:read:stream_key	'
)

export const DISCOVERY =
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'

export const YOUTUBE_PRIVACY_POLICY = [
  { value: 'Private', label: 'Private' },
  { value: 'Public', label: 'Public' },
  { value: 'Unlisted', label: 'Unlisted' },
]
