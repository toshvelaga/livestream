import axios from 'axios'

const baseURL = 'http://localhost:5001/api'

const API = axios.create({
  baseURL,
})

export default API
