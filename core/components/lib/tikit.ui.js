//! First Responders
exports.createView = args => {
	let kitComponent = Ti.UI.createView(args);

	if (args.classes) kitComponent.applyProperties(createStyles(args.classes.split(' ').filter((classes) => classes.includes('bg-')), 'Ti.UI.View'));

	return kitComponent;
}

exports.createLabel = args => {
	let kitComponent = Ti.UI.createLabel(args);

	if (args.classes) {
		let styles = createStyles(args.classes.split(' ').filter((classes) => classes.includes('text-') || classes.includes('font-')), 'Ti.UI.Label');
		if (styles.font && !styles.font.fontSize) styles.font.fontSize = args.font.fontSize;
		kitComponent.applyProperties(styles);
	}

	return kitComponent;
}

exports.createTab = args => {
	if (args.icon && args.icon.includes(' ')) args.icon = labelToImage(createStyles(args.icon.split(' '), 'Ti.UI.Label'));

	if (args.activeIcon && args.activeIcon.includes(' ')) args.activeIcon = labelToImage(createStyles(args.activeIcon.split(' '), 'Ti.UI.Label'));

	return Ti.UI.createTab(args);
};

//! createAnnotation still in development!!
exports.createAnnotation = args => {
	let Map = require('ti.map');

	if (args.image && args.image.includes(' ')) {
		let theLabel = Ti.UI.createLabel({ text: args.title, color: '#fff' });
		let theContainer = Ti.UI.createView({ layout: 'vertical', width: Ti.UI.SIZE, height: Ti.UI.SIZE });
		let theIcon = Ti.UI.createImageView({ image: labelToImage(createStyles(args.image.split(' '), 'Ti.UI.Label')) });

		theContainer.add(theIcon);
		theContainer.add(theLabel);

		args.image = theContainer.toImage();
	}

	return Map.createAnnotation(args);
}

exports.createIcon = args => {
	if (args.id === 'close' && !args.dismissible) return Ti.UI.createLabel({ width: 0, height: 0, right: 0 });

	let kitComponent = Ti.UI.createLabel(args);

	if (args.icon) {
		let styles = createStyles(args.icon.split(' '), 'Ti.UI.Label');
		if (styles.font && !styles.font.fontSize) styles.font.fontSize = args.font.fontSize;
		kitComponent.applyProperties(styles);
	}

	return kitComponent;
}

exports.createAlert = args => {
	if (componentExists('alerts', args.variant, args.color)) return createComponent('alerts', args.variant, args.color, args);

	throw new Error(`Alert not found: ${JSON.stringify(args, null, 2)}`);
};

exports.createAvatar = args => {
	if (componentExists('avatars', args.variant, args.size)) return createComponent('avatars', args.variant, args.size, args);

	throw new Error(`Avatar not found: ${JSON.stringify(args, null, 2)}`);
};

exports.createCard = args => {
	if (componentExists('cards', args.variant, args.color)) return createComponent('cards', args.variant, args.color, args);

	throw new Error(`Card not found: ${JSON.stringify(args, null, 2)}`);
};

//! Components
exports.createButton = args => {
	if (componentExists('buttons', args.variant, args.size)) return createComponent('buttons', args.variant, args.size, args);

	return Ti.UI.createButton(args);
};

exports.createTikitButton = args => {
	let kitComponent = (OS_IOS) ? Ti.UI.createButton(args) : Ti.UI.createView(args);

	if (args.classes) kitComponent.applyProperties(createStyles(args.classes.split(' '), (OS_IOS) ? 'Ti.UI.Button' : 'Ti.UI.View'));

	return kitComponent;
};

exports.createTikitAlert = args => {
	let kitComponent = Ti.UI.createView(args);

	if (args.dismissible) kitComponent.addEventListener('click', tiKitEvent);

	if (args.classes) kitComponent.applyProperties(createStyles(args.classes.split(' '), 'Ti.UI.View'));

	(args.duration || args.delay) ? kitComponent.animate({ opacity: 1, delay: args.delay ?? 0, duration: args.duration ?? 250 }) : kitComponent.applyProperties({ opacity: 1 });

	return kitComponent;
};

exports.createTikitAvatar = args => {
	if (args.border) { args.borderWidth = 2; args.borderColor = '#fff'; }

	let kitComponent = (args.component === 'avatar') ? Ti.UI.createImageView(args) : Ti.UI.createView(args);

	if (args.classes) kitComponent.applyProperties(createStyles(args.classes.split(' '), 'Ti.UI.View'));

	// For stacked avatars
	if (args.last) kitComponent.applyProperties({ right: null });

	return kitComponent;
};

exports.createTikitCode = args => {
	let kitComponent = Ti.UI.createView(args);

	if (args.copy) kitComponent.addEventListener('click', tiKitCopy);

	if (args.classes) kitComponent.applyProperties(createStyles(args.classes.split(' ').filter((classes) => !classes.includes('bg-')), 'Ti.UI.View'));

	return kitComponent;
};

exports.createTikitCard = args => {
	let kitComponent = Ti.UI.createView(args);

	if (args.classes) kitComponent.applyProperties(createStyles(args.classes.split(' '), 'Ti.UI.View'));

	return kitComponent;
};

// !Helper Functions
function tiKitEvent(e) {
	// Remove alert
	if (e.source.component === 'alert') {
		e.source.removeEventListener('click', tiKitEvent);

		e.source.animate({ opacity: 0, duration: (e.source.duration) ? e.source.duration : 250 }, () => { e.source.parent.remove(e.source); });
	}
}

function tiKitCopy(e) {
	if (e.source.btn === 'copy') {
		Ti.UI.Clipboard.setText(e.source.value);

		alert(L('code_copied', 'Code copied to clipboard!'));
	}
}

function componentExists(_component, _variant, _file) {
	return Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, `/alloy/controllers/tikit/${_component}/${_variant}/${_file}.js`).exists();
}

function createComponent(_component, _variant, _file, _args) {
	return Alloy.createController(`tikit/${_component}/${_variant}/${_file}`, _args).getView();
}

function createStyles(_styles, _view) {
	// apiName is not included in `Alloy.createStyle` to avoid getting extra properties from `index`
	let styles = Alloy.createStyle('index', { classes: _styles.filter(Boolean) });
	styles.apiName = _view;

	return styles;
}

function labelToImage(_styles) {
	if (_styles.font && !_styles.font.fontSize) _styles.font.fontSize = 26;

	return Ti.UI.createLabel(_styles).toImage();
}
