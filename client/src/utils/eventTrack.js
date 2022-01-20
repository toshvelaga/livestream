import ReactGA from 'react-ga'

const eventTrack = (category, action, label) => {
  console.log('GA event:', category, ':', action, ':', label)
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  })
}

export default eventTrack
