function copyUrl() {
  const url_transform = document.querySelector('#url_transform')
  navigator.clipboard.writeText(url_transform.href)
  alert("Copied the text: " + url_transform.href)
}