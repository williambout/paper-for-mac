const {app, shell, Menu, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

let mainWindow;
win = null;
const menuTemplate = require('./menu');

function createWindow () {
  let appMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(appMenu);
  win = new BrowserWindow(
    {
      width: 1024,
      height: 700,
      titleBarStyle: 'hidden',
      vibrancy: 'light',
      minWidth: 800,
      minHeight: 600,

    }
  )

  win.loadURL('file://' + __dirname + '/app/index.html');

  win.on('closed', () => {
    win = null
  })
  return win;
}

app.on('ready', () => {
	mainWindow = createWindow();
});

app.on('activate', (event, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    createWindow();
  }
});
