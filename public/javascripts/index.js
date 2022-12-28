function copyUrl() {
  const url_transform = document.querySelector('#url_transform')
  navigator.clipboard.writeText(url_transform.href)
    .then(() => alert("Copied the text: " + url_transform.href))
    .catch(() => alert("Fail to copy url"))
}