const { app, Menu, BrowserWindow, dialog } = require('electron')
const MarkdownIt = require('markdown-it')
const fs = require('fs')

const setMainMenu = (mainWindow) => {
  const template = [
    {
      label: 'miduMarkdown',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit', accelerator: 'CmdOrCtrl+Q' },
        {
          label: 'Salir',
          click: () => {
            app.quit()
          }
        },
        {
          label: 'Abrir Archivo',
          click: () => {
            dialog.showOpenDialog(mainWindow, {
              defaultPath: app.getPath('documents'),
              filters: [
                { name: 'Markdown', extensions: ['md', 'markdown'] }
              ],
              title: 'Selecione un archivo de markdown',
              properties: ['openFile']
            })
              .then(result => {
                if (!result.canceled) {
                  // result is a path, we need to read the file
                  const file = result.filePaths[0]
                  const markdown = fs.readFileSync(file, 'utf-8')
                  const md = new MarkdownIt({
                    html: true, // Enable HTML tags in source
                    xhtmlOut: true, // Use '/' to close single tags (<br />).
                    // This is only for full CommonMark compatibility.
                    breaks: true, // Convert '\n' in paragraphs into <br>
                    langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
                    // useful for external highlighters.
                    linkify: true, // Autoconvert URL-like text to links

                    // Enable some language-neutral replacement + quotes beautification
                    // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
                    typographer: false,

                    // Double + single quotes replacement pairs, when typographer enabled,
                    // and smartquotes on. Could be either a String or an Array.
                    //
                    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
                    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
                    quotes: '“”‘’',

                    // Highlighter function. Should return escaped HTML,
                    // or '' if the source string is not changed and should be escaped externally.
                    // If result starts with <pre... internal wrapper is skipped.
                    highlight: function (/* str, lang */) { return '' }
                  })
                  const html = md
                    .enable('image')
                    .render(markdown)
                  BrowserWindow.getFocusedWindow().webContents.send('file-opened', html)
                }
              })
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          click: () => {
            BrowserWindow.getFocusedWindow().reload()
          }
        }
      ]
    },
    {
      label: 'Developer',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools', accelerator: 'F12' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Themes',
      submenu: [
        {
          label: 'Light',
          click: () => {
            mainWindow.webContents.send('theme', 'light')
          }
        },
        {
          label: 'Dark',
          click: () => {
            mainWindow.webContents.send('theme', 'dark')
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

module.exports = {
  setMainMenu
}
