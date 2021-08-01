const shareOnTwitter = (referralLink) => {
  var text = 'Interested in becoming a streamer? Get started with livestreaming'
  window.open(
    'http://twitter.com/share?url=' +
      encodeURIComponent(referralLink) +
      '&text=' +
      encodeURIComponent(text),
    '',
    'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0'
  )
}

export default shareOnTwitter