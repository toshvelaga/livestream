import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'ohmystream.xyz/api'
    : 'http://localhost:5001/api'

const API = axios.create({
  baseURL,
})

export default API
