const $ = selector => document.querySelector(selector)

window.electronAPI.onUpdateTheme(theme => {
  const root = document.documentElement
  root.style.setProperty('--scheme', theme)
})

window.electronAPI.getFile(file => {
  console.log(file)
  const $preview = $('#preview')
  $preview.innerHTML = file
})
