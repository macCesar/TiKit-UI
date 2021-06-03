exports.createTikitAlertComponent = function(args) {
	let theView = Ti.UI.createView(args);

	if (OS_IOS) {
		theView.addEventListener('singletap', alertListener);
	} else if (OS_ANDROID) {
		theView.addEventListener('click', alertListener);
	}

	theView.animate({
		opacity: 1,
		duration: 250
	});

	return theView;
};

exports.createTikitButtonComponent = function(args) {
	let theView = (OS_IOS) ? Ti.UI.createButton(args) : Ti.UI.createView(args);

	if (OS_IOS) {
		theView.addEventListener('singletap', buttonListener);
	} else if (OS_ANDROID) {
		theView.addEventListener('click', buttonListener);
	}

	return theView;
};

function buttonListener(e) {
	e.source.fireEvent('tikitButtonEvent', e);
}

function alertListener(e) {
	e.source.fireEvent('tikitAlertEvent', e);

	if (OS_IOS) {
		e.source.removeEventListener('singletap', alertListener);
	} else if (OS_ANDROID) {
		e.source.removeEventListener('click', alertListener);
	}

	e.source.animate({
		opacity: 0,
		duration: 250
	}, () => {
		e.source.parent.remove(e.source);
	});
}
