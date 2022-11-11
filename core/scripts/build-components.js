const fs = require('fs-extra');
const _ = require('lodash');
const path = require('path');
const colores = require('../../lib/colores').colores;
const helpers = require('../../lib/helpers');
const packageLabel = colores.packageLabel;

(function constructor() {
	console.log(`${packageLabel} Buildings Components!`);

	const publicComponents = require(path.resolve('core/scripts/public-components'));

	helpers.makeSureFolderExists(path.resolve('dist'));

	_.each(publicComponents.components, (data, component) => {
		let currentDistributionGroup = path.resolve(`dist/${component}`);

		helpers.makeSureFolderExists(currentDistributionGroup);

		_.each(data.templates, template => {
			let currentTemplate = fs.readFileSync(path.resolve(`core/components/public/${component}/${template}.xml`), 'utf8');

			helpers.makeSureFolderExists(currentDistributionGroup + '/' + template);

			_.each(data.properties, property => {
				let elementosReemplazados = _.replace(currentTemplate, new RegExp("{color}", "g"), property.color);

				elementosReemplazados = _.replace(elementosReemplazados, new RegExp("{icon}", "g"), property.icon);

				elementosReemplazados = _.replace(elementosReemplazados, new RegExp("{name}", "g"), property.name);

				elementosReemplazados = _.replace(elementosReemplazados, new RegExp("{size}", "g"), property.size);
				elementosReemplazados = _.replace(elementosReemplazados, new RegExp("{iconWidth}", "g"), property.iconWidth);
				elementosReemplazados = _.replace(elementosReemplazados, new RegExp("{width}", "g"), property.width);
				elementosReemplazados = _.replace(elementosReemplazados, new RegExp("{height}", "g"), property.height);

				elementosReemplazados = _.replace(elementosReemplazados, new RegExp("{rounded}", "g"), property.rounded);

				elementosReemplazados = _.replace(elementosReemplazados, new RegExp("{text}", "g"), property.text);

				elementosReemplazados = _.replace(elementosReemplazados, new RegExp("{elements}", "g"), property.elements);

				elementosReemplazados = _.replace(elementosReemplazados, new RegExp("{negativeMargin}", "g"), property.negativeMargin);

				fs.writeFileSync(path.resolve(`${currentDistributionGroup}/${template}/${property.name}.xml`), elementosReemplazados, err => { throw err; });
			});
		});

		fs.copySync('core/components/lib/tikit.ui.js', 'dist/lib/tikit.ui.js');
	});
}());
