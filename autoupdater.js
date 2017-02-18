const {app, autoUpdater, dialog} = require('electron');
const version = app.getVersion();

const updaterFeedURL = 'https://paper-updates.herokuapp.com/update/darwin_64/' + version;
let updateCheck;

function appUpdater(checkType) {
	updateCheck = checkType;
	autoUpdater.setFeedURL(updaterFeedURL);
	autoUpdater.checkForUpdates();
}

autoUpdater.on('update-not-available', () => {
	if (updateCheck === 'manual')
		dialog.showMessageBox({message: 'No update available', detail: 'Version ' + version + ' is the latest version.'});
});

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
	let message = app.getName() + ' ' + releaseName + ' is now available. It will be installed the next time you restart the application.';
	if (releaseNotes) {
		const splitNotes = releaseNotes.split(/[^\r]\n/);
		message += '\n\nRelease notes:\n';
		splitNotes.forEach(notes => {
			message += notes + '\n\n';
		});
	}

	dialog.showMessageBox({
		type: 'question',
		buttons: ['Install and Relaunch', 'Later'],
		defaultId: 0,
		message: 'A new version of ' + app.getName() + ' has been downloaded',
		detail: message
	}, response => {
		if (response === 0) {
			setTimeout(() => autoUpdater.quitAndInstall(), 1);
		}
	});
});

exports = module.exports = {
	appUpdater
};
