const electron = require('electron')

const {
  BrowserWindow,
  Menu,
  MenuItem,
  ipcMain,
  app,
  ipcRenderer
} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


//app.on('ready', createWindow)

app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  createWindow()
})

let template = [
  {
    label: 'Menu 1',
    submenu: [{
      label: 'Menu items 1'
    }]
  },
  {
    label: 'Menu 2',
      submenu: [{
        label: 'Another Menu item'
      }, {
        label: 'One More Menu Item'
    }]
  }
]

/******************************************************
SEE RENDEERE.JS FILE TO SEE HOW TO IMPLEMENT  CONTEXT MENU
FROM RENDERER PROCESS
*******************************************************/



// \v|v/ FOR IMPLEMENTING CONTEXT MENU from main process
// *****************************************************

// const menu = new Menu()
// menu.append(new MenuItem({ label: 'Hello' }))
// menu.append(new MenuItem({ type: 'separator' }))
// menu.append(new MenuItem({ label: 'Electron', type: 'checkbox', checked: true }))

// app.on('browser-window-created', (event, win) => {
//   win.webContents.on('context-menu', (e, params) => {
//     menu.popup(win, params.x, params.y)
//   })
// })

// ipcMain.on('show-context-menu', (event) => {
//   const win = BrowserWindow.fromWebContents(event.sender)
//   menu.popup(win)
// })

// *****************************************************
// /^|^\ FOR IMPLEMENTING CONTEXT MENU from main process


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//require('context-menu.js')