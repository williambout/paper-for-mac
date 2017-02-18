const {app, shell, Menu, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const windowStateKeeper = require('electron-window-state');
const {moveToApplications} = require('electron-lets-move');
const {appUpdater} = require('./autoupdater');

var isDevelopment = process.env.NODE_ENV === 'development';

let mainWindow;
win = null;
const menuTemplate = require('./menu');

function createWindow () {
  let appMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(appMenu);

  let mainWindowState = windowStateKeeper({
    defaultWidth: 1024,
    defaultHeight: 700
  });

  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    titleBarStyle: 'hidden',
    vibrancy: 'light',
    minWidth: 800,
    minHeight: 600,
  });

  mainWindowState.manage(win);

  win.loadURL('file://' + __dirname + '/app/index.html');

  win.on('closed', () => {
    win = null
  })
  return win;
}

app.on('ready', () => {
  mainWindow = createWindow();
  if (!isDevelopment) {
    moveToApplications();
    appUpdater();
  }
});

app.on('activate', (event, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    createWindow();
  }
});
