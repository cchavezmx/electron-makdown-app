const { app, BrowserWindow } = require('electron')
const path = require('path')
const { setMainMenu } = require('./menu')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // no puede tener acceso a la geolocalización
  // las estaciones deben ser configuradas manualmente

  win.loadFile('index.html')
  // win.loadURL('https://induction-sorting-console-git-pa-1152-99minutos.vercel.app/')
  setMainMenu()
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  // win32 = Windows, darwin = macOS, linux = Linux
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
