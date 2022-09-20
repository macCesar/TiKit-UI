const fs = require('fs-extra');
const colores = require('./colores').colores;
const packageLabel = colores.packageLabel;

function saveFile(file, data) {
	fs.writeFileSync(file, data, err => { throw err; });

	console.log(`${packageLabel} '${file}' file created!`);
}
exports.saveFile = saveFile;

function makeSureFolderExists(folder) {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
	}
}
exports.makeSureFolderExists = makeSureFolderExists;

function copyFile(src, dest, callback) {
	fs.copySync(src, dest);
}
exports.copyFile = copyFile;
