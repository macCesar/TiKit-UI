const fs = require('fs-extra');
const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const process = require('process');
const helpers = require('./lib/helpers');
const colores = require('./lib/colores').colores;
module.exports.colores = colores;
const packageLabel = colores.packageLabel;

const cwd = process.cwd();
const logger = {
	info: function(...args) {
		console.log(packageLabel, args.join(' '));
	},
	warn: function(...args) {
		console.log(packageLabel, chalk.yellow(args.join(' ')));
	},
	error: function(...args) {
		console.log(packageLabel, chalk.red(args.join(' ')));
	},
	file: function(...args) {
		console.log(packageLabel, chalk.yellow(args.join(' ')), 'file created!');
	}
}

//! list Command
function list(folder) {
	if (folder) {
		logger.warn('List of components for', folder);
		walkSync(path.resolve(__dirname, `dist/${folder}`), (viewPath, stat, espacios) => {
			logger.info(espacios + '├─', path.basename(viewPath));
		});
	} else {
		logger.warn('Available components:');
		walkSync(path.resolve(__dirname, `dist`), (viewPath, stat, espacios) => {
			logger.info(espacios + '├─', path.basename(viewPath));
		});
	}

	console.log('\n' + packageLabel, 'Run', chalk.yellow('`tikit install all`'), 'to install the entire components library');
	logger.info('Run', chalk.yellow('`tikit install [componet]`'), 'to install the entire set of styles of a component');
	logger.info('Run', chalk.yellow('`tikit install [componet/folder]`'), 'to install single set of styles of a component');
	logger.info('Run', chalk.yellow('`tikit install [componet/folder] [style]`'), 'to install a single style of a component');
}
exports.list = list;

//! help Command
function help(component) {
	if (component) {
		logger.info('Showing:', component);
	} else {
		logger.info('Please run:', chalk.yellow('`tikit help <component>`'), 'to learn more about it!');

		const publicComponents = require(path.resolve(__dirname, 'core/scripts/public-components'));

		const availableGroups = _.flatMap(publicComponents.components, (data, component) => component).join(', ');

		logger.info('Avaliable components:', chalk.yellow(availableGroups));
	}
}
exports.help = help;

function walkSync(currentDirPath, callback, espacios = '') {
	let files = fs.readdirSync(currentDirPath);

	files.forEach(name => {
		let filePath = path.join(currentDirPath, name);

		let stat = fs.statSync(filePath);

		if (stat.isFile()) {
			callback(filePath, stat, espacios);
		} else if (stat.isDirectory()) {
			console.log(packageLabel, espacios + '└─ ' + chalk.yellow(name));
			walkSync(filePath, callback, espacios + '   ');
		}
	});
}

//! install Command
function install(folder, components) {
	if (!alloyProject()) return;

	if (folder === 'all') {
		folder = undefined;
	}

	if (!folder) {
		let folders = fs.readdirSync(path.resolve(__dirname, 'dist'));
		folders.forEach(folder => {
			let source = path.resolve(__dirname, `dist/${folder}`);
			let destination = `${cwd}/app/views/tikit/${folder}`;
			fs.copySync(source, destination);
		});
		logger.warn('Some components use FontAwesome Icons. Please make sure you put them in `./assets/fonts` folder')
	} else if (!components) {
		let source = path.resolve(__dirname, `dist/${folder}`);
		if (!fs.existsSync(source)) {
			console.log(chalk.yellow(folder), 'Folder does not exists!');
			return;
		}
		let destination = `${cwd}/app/views/tikit/${folder}`;
		fs.copySync(source, destination);
	} else {
		let source = path.resolve(__dirname, `dist/${folder}`);
		if (!fs.existsSync(source)) {
			console.log(chalk.yellow(folder), 'Folder does not exists!');
			return;
		}

		if (!components.includes('.xml')) {
			components += '.xml';
		}

		source = path.resolve(__dirname, `dist/${folder}/${components}`);
		if (!fs.existsSync(source)) {
			console.log(`Component ${chalk.yellow(components)} does not exists!`);
			return;
		}
		let destination = `${cwd}/app/views/tikit/${folder}/${components}`;
		fs.copySync(source, destination);
	}
}
exports.install = install;

function prompts() {
	// https://github.com/terkelg/prompts
	const prompts = require('prompts');

	(async () => {
		const response = await prompts({
			type: 'multiselect',
			name: 'value',
			message: 'Which components do you want to install?',
			choices: [
				{ title: 'alerts', value: 'alerts' },
				{ title: 'buttons', value: 'buttons' },
				{ title: 'cards', value: 'cards' }
			],
			hint: '- Space to select. Return to submit'
		});

		// console.log(response); // => { value: 24 }
	})();
}

//! helper Functions
function alloyProject() {
	if (!fs.existsSync(cwd + '/app/views')) {
		logger.error('Please make sure you’re running TiKit inside an Alloy Project.');

		return false;
	}

	return true;
}
