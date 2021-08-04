import axios from 'axios'

const baseURL = 'http://localhost:5001/api'

export default axios.create({
  baseURL,
})
