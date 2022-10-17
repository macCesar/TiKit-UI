const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const process = require('process');
const helpers = require('./lib/helpers');
const colores = require('./lib/colores').colores;
module.exports.colores = colores;
const packageLabel = colores.packageLabel;

const cwd = process.cwd();
const logger = {
	success: function(...args) {
		console.log(packageLabel, chalk.green(args.join(' ')));
	},
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

//! install Command
function install(component, variant) {
	if (!alloyProject()) return;

	if (!component) {
		return prompts();
	} else if (component === 'all') {
		fs.readdirSync(path.resolve(__dirname, 'dist')).forEach(component => {
			if (component !== 'lib') fs.copySync(path.resolve(__dirname, `dist/${component}`), `${cwd}/app/views/tikit/${component}`);
		});

		postInstall(chalk.yellow('./app/views/tikit'));
	} else if (component === 'lib' || component === 'module') {
		installKitUI();
	} else if (!variant) {
		let source = path.resolve(__dirname, `dist/${component}`);
		if (!fs.existsSync(source)) return console.log(chalk.yellow(component), 'Folder does not exists!');
		fs.copySync(source, `${cwd}/app/views/tikit/${component}`);

		postInstall(chalk.yellow(`./app/views/tikit/${component}`));
	} else {
		let source = path.resolve(__dirname, `dist/${component}`);
		if (!fs.existsSync(source)) return console.log(chalk.yellow(component), 'Folder does not exists!');

		if (!variant.includes('.xml')) variant += '.xml';

		source = path.resolve(__dirname, `dist/${component}/${variant}`);
		if (!fs.existsSync(source)) return console.log(`Component ${chalk.yellow(variant)} does not exists!`);
		fs.copySync(source, `${cwd}/app/views/tikit/${component}/${variant}`);

		postInstall(chalk.yellow(`./app/views/tikit/${component}/${variant}`));
	}
}
exports.install = install;

//! list Command
function list(folder) {
	if (folder) {
		logger.success('List of variants for', chalk.yellow(folder));
		walkSync(path.resolve(__dirname, `dist/${folder}`), (viewPath, spaces) => {
			if (viewPath.length > 0) {
				logger.info(spaces + '└─ ' + viewPath.join(', '));
			}
		});
	} else {
		logger.success('Available components and their variants:');
		walkSync(path.resolve(__dirname, `dist`), (viewPath, spaces) => {
			if (viewPath.length > 0) {
				logger.info(spaces + '└─ ' + viewPath.join(', '));
			}
		});
	}

	console.log('\n' + packageLabel, 'Run', chalk.yellow('`tikit install all`'), 'to install the entire TiKit component library');
	logger.info('Run', chalk.yellow('`tikit install [componet]`'), 'to install all files and variants of a component');
	logger.info('Run', chalk.yellow('`tikit install [componet/variant]`'), 'to install all files of a component’s variant');
	logger.info('Run', chalk.yellow('`tikit install [componet/variant] [name]`'), 'to install a single file of a component’s variant');
}
exports.list = list;

//! help Command
function help(component) {
	if (component) {
		logger.info('Showing:', component);
	} else {
		logger.info('Please run:', chalk.yellow('`tikit help <component>`'), 'to learn more about it!');

		const publicComponents = require(path.resolve(__dirname, 'core/scripts/public-components'));

		const availableComponents = _.flatMap(publicComponents.components, (data, component) => component).join(', ');

		logger.info('Avaliable components:', chalk.yellow(availableComponents));
	}
}
exports.help = help;

//! helper Functions
function alloyProject() {
	if (!fs.existsSync(cwd + '/app/views')) {
		logger.error('Please make sure you’re running TiKit inside an Alloy Project.');

		return false;
	}

	return true;
}

function prompts() {
	// https://github.com/terkelg/prompts
	const prompts = require('prompts');

	(async () => {
		let publicComponents = require(path.resolve(__dirname, 'core/scripts/public-components'));
		let availableComponents = _.flatMap(publicComponents.components, (data, component) => component).sort().map(
			(component) => {
				return {
					title: component,
					value: component
				};
			}
		);
		if (availableComponents.length > 1) availableComponents.unshift({ title: 'all components', value: 'all' });

		let selectedComponent = await prompts({
			name: 'value',
			type: 'select',
			choices: availableComponents,
			message: 'Choose a component to install'
		});

		if (selectedComponent.value) {
			if (selectedComponent.value === 'all') {
				install('all');
			} else {
				let availableVariants = publicComponents.components[selectedComponent.value].templates.sort().map((variant) => {
					return {
						title: variant,
						value: variant
					};
				});
				if (availableVariants.length > 1) availableVariants.unshift({ title: 'all variants', value: 'all' });

				let selectedVariant = await prompts({
					name: 'value',
					type: 'select',
					choices: availableVariants,
					message: 'Choose a variant',
				});

				if (selectedVariant.value) {
					if (selectedVariant.value === 'all') {
						install(selectedComponent.value);
					} else {
						let type = publicComponents.components[selectedComponent.value].base;
						let availableFiles = publicComponents.components[selectedComponent.value].properties.sort(
							(a, b) => a.name.localeCompare(b.name)
						).map((file) => {
							return {
								title: file.name,
								value: file.name
							};
						});
						if (availableFiles.length > 1) availableFiles.unshift({ title: `all ${type}s`, value: 'all' });

						let selectedFile = await prompts({
							name: 'value',
							type: 'select',
							choices: availableFiles,
							message: `Choose a ${type}`,
						});

						if (selectedFile.value) {
							if (selectedFile.value === 'all') {
								install(`${selectedComponent.value}/${selectedVariant.value}`);
							} else {
								install(`${selectedComponent.value}/${selectedVariant.value}`, `${selectedFile.value}`);
							}
						}
					}
				}
			}
		}
	})();
}

function postInstall(message) {
	checkForKitUI();

	logger.info('Components installed in', message);

	checkForFontAwesome();
}

function walkSync(currentDirPath, callback, spaces = '') {
	let files = fs.readdirSync(currentDirPath);

	let actualFiles = [];
	files.forEach(name => {
		let filePath = path.join(currentDirPath, name);
		let stat = fs.statSync(filePath);
		if (stat.isFile()) {
			actualFiles.push(path.basename(filePath).split('.').slice(0, -1).join('.'));
		} else if (stat.isDirectory()) {
			logger.info(spaces + '└─ ' + chalk.yellow(name));
			walkSync(filePath, callback, spaces + '   ');
		}
	});

	callback(actualFiles, spaces);
}

function checkForKitUI() {
	if (!fs.existsSync(cwd + '/app/lib')) {
		installKitUI();
	} else {
		let files = fs.readdirSync(cwd + '/app/lib');
		let tikitlib = files.filter((file) => file.includes('tikit.ui.js'));

		if (tikitlib.length === 0) {
			installKitUI();
		}
	}
}

function installKitUI() {
	fs.copySync(path.resolve(__dirname, 'dist/lib/tikit.ui.js'), `${cwd}/app/lib/tikit.ui.js`);
	logger.info(chalk.yellow('tikit.ui'), 'module installed in', chalk.yellow(`./app/lib/tikit.ui.js`));
}

function checkForFontAwesome() {
	if (!fs.existsSync(cwd + '/app/assets/fonts')) {
		installFontAwesomeMessage();
	} else {
		let files = fs.readdirSync(cwd + '/app/assets/fonts');
		let fontAwesome = files.filter((file) => file.includes('FontAwesome'));

		if (fontAwesome.length === 0) {
			installFontAwesomeMessage();
		}
	}
}

function installFontAwesomeMessage() {
	console.log();
	logger.warn('Some components use FontAwesome Icons!');
	logger.warn('Please install them with:', chalk.green(`purgetss fonts -v=fa`));
}
