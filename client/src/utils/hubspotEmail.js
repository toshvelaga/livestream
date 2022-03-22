import API from '../api/api'

const hubspotEmail = (email) => {
  return API.post('/hubspot', {
    email: email,
  })
}

export default hubspotEmail
