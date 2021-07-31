const deleteCookie = (name) => {
  window.document.cookie = `${encodeURIComponent(name)}=; Max-Age=-99999999;`
}

export default deleteCookie
