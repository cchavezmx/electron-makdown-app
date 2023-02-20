// como una especie de middleware para comunicar el proceso de la aplicación con el proceso de la ventana
// para trear objetos de una base de datos
// getLocations

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateTheme: (theme) => {
    ipcRenderer.on('theme', (event, arg) => {
      theme(arg)
    })
  },
  getFile: (file) => {
    ipcRenderer.on('file-opened', (event, arg) => {
      file(arg)
    })
  }
})
