const {SpellCheckHandler, ContextMenuListener, ContextMenuBuilder} = require('electron-spellchecker');
const {remote } = require('electron');

window.spellCheckHandler = new SpellCheckHandler();
setTimeout(() => window.spellCheckHandler.attachToInput(), 1000);

window.spellCheckHandler.provideHintText('This is probably the language that you want to check in');
window.spellCheckHandler.autoUnloadDictionariesOnBlur();

window.contextMenuBuilder = new ContextMenuBuilder(window.spellCheckHandler, null, true);
window.contextMenuListener = new ContextMenuListener((info) => { window.contextMenuBuilder.showPopupMenu(info); });

document.addEventListener('DOMContentLoaded', function(event) {
  const notificationIndicator = document.querySelectorAll('.hp-notifications-badge')[0];

  setTimeout(() => {
    setBadge(notificationIndicator.textContent);
  }, 200);

  notificationIndicator.addEventListener('DOMCharacterDataModified', function(event) {
    setBadge(event.newValue);
  });

  function setBadge(newValue) {
    if (newValue !== '0')
      remote.app.dock.setBadge(newValue);
    else
      remote.app.dock.setBadge('');
  }
});
