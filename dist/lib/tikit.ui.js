// Alert Component
exports.createTikitAlertComponent = (args) => {
	let tiKitComponent = Ti.UI.createView(args);

	tiKitComponent.animate({
		opacity: 1,
		duration: (args.fadeSpeed) ? args.fadeSpeed : 250
	});

	// Override classes
	if (args.tiKitClass) {
		tiKitComponent.applyProperties(Alloy.createStyle('index', {
			classes: args.tiKitClass.split(' '),
			apiName: (OS_IOS) ? 'Button' : 'View'
		}));
	}

	return setEventListener(tiKitComponent);
};

// Button Component
exports.createTikitButtonComponent = (args) => {
	let tiKitComponent = (OS_IOS) ? Ti.UI.createButton(args) : Ti.UI.createView(args);

	// Override classes
	if (args.tiKitClass) {
		tiKitComponent.applyProperties(Alloy.createStyle('index', {
			classes: args.tiKitClass.split(' '),
			apiName: (OS_IOS) ? 'Button' : 'View'
		}));
	}

	return setEventListener(tiKitComponent);
};

// Avatar Component
exports.createTikitAvatarComponent = (args) => {
	let tiKitComponent = Ti.UI.createImageView(args);

	// Override classes
	if (args.tiKitClass) {
		tiKitComponent.applyProperties(Alloy.createStyle('index', {
			apiName: 'ImageView',
			classes: args.tiKitClass.split(' ')
		}));
	}

	// For group avatars
	if (args.last) {
		tiKitComponent.right = -1 * tiKitComponent.right / 2;
	}

	return setEventListener(tiKitComponent);
};

// !Helper Functions
function tiKitEvent(e) {
	e.source.fireEvent('tiKit', e);

	// Remove alert
	if (e.source.tiKitComponent === 'alert') {
		if (OS_IOS) {
			e.source.removeEventListener('singletap', tiKitEvent);
		} else if (OS_ANDROID) {
			e.source.removeEventListener('click', tiKitEvent);
		}

		e.source.animate({
			opacity: 0,
			duration: (e.source.fadeSpeed) ? e.source.fadeSpeed : 250
		}, () => {
			e.source.parent.remove(e.source);
		});
	}
}

function setEventListener(tiKitComponent) {
	if (OS_IOS) {
		tiKitComponent.addEventListener('singletap', tiKitEvent);
	} else if (OS_ANDROID) {
		tiKitComponent.addEventListener('click', tiKitEvent);
	}

	return tiKitComponent;
}
