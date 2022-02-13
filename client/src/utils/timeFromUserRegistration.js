const timeFromUserRegistration = (dateUserRegistered) => {
  //   example of dateUserRegistered = '2021-07-30T05:05:27.000Z'
  const userDataRegistered = Date.parse(dateUserRegistered)
  const currDate = Date.parse(new Date())

  const dateDiff = currDate - userDataRegistered
  console.log(dateDiff)

  const days = dateDiff / (60 * 60 * 24 * 1000)
  return days
}

export default timeFromUserRegistration
