const shareOnFacebook = () => {
  var url = 'http://google.com'
  window.open(
    'http://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
    '',
    'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0'
  )
}

export default shareOnFacebook
