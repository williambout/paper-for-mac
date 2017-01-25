const fs = require('fs');
const path = require('path');
const {shell} = require('electron');

const webview = document.getElementById('paper');
const loader = document.getElementById('loader');

webview.addEventListener('dom-ready', () => {
  webview.insertCSS(fs.readFileSync(path.join(__dirname, '/css/main.css'), 'utf8'));
});

webview.addEventListener('new-window', (event) => {
  event.preventDefault();
  shell.openExternal(event.url);
});

webview.addEventListener('did-start-loading', () => {
  loader.classList.add('-active');
});

webview.addEventListener('did-stop-loading', () => {
  loader.classList.remove('-active');
});

window.addEventListener('focus', () => webview.focus());
