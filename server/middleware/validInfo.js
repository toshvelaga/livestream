module.exports = function (req, res, next) {
  const { email } = req.body

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
  }

  if (!validEmail(email)) {
    return res.status(401).json({ email: 'Please add a valid email address' })
  }

  next()
}
