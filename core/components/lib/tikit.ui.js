// TiKit UI v1.1.7
// Created by César Estrada
// https://purgetss.com/tikit

// ! First Responders
exports.createView = args => {
  let kitComponent = Ti.UI.createView(args)

  if (args.classes) {
    kitComponent.applyProperties(createStyles(args.classes.split(' ').filter((classes) => classes.includes('bg-')), 'Ti.UI.View'))
  }

  return kitComponent
}

exports.createImageView = args => {
  let kitComponent = Ti.UI.createImageView(args)

  if (args.rounded >= 0 && Number.isInteger(args.rounded)) {
    kitComponent.applyProperties({ borderRadius: args.rounded * 2 })
  }

  return kitComponent
}

exports.createLabel = args => {
  let kitComponent = Ti.UI.createLabel(args)

  if (args.classes) {
    let styles = createStyles(args.classes.split(' ').filter((classes) => classes.includes('text-') || classes.includes('font-')), 'Ti.UI.Label')
    if (styles.font && !styles.font.fontSize) {
      styles.font.fontSize = args.font.fontSize
    }
    kitComponent.applyProperties(styles)
  }

  return kitComponent
}

exports.createTab = args => {
  if (args.icon && args.icon.includes(' ')) {
    args.icon = labelToImage(createStyles(args.icon.split(' '), 'Ti.UI.Label'))
  }

  if (args.activeIcon && args.activeIcon.includes(' ')) {
    args.activeIcon = labelToImage(createStyles(args.activeIcon.split(' '), 'Ti.UI.Label'))
  }

  return Ti.UI.createTab(args)
}

exports.createIcon = args => {
  if (args.id === 'close' && !args.dismissible) {
    return Ti.UI.createLabel({ width: 0, height: 0, right: 0 })
  }

  let kitComponent = Ti.UI.createLabel(args)

  if (args.icon) {
    let styles = createStyles(args.icon.split(' '), 'Ti.UI.Label')
    if (styles.font && !styles.font.fontSize) {
      styles.font.fontSize = args.font.fontSize
    }
    kitComponent.applyProperties(styles)
  }

  return kitComponent
}

// ! Interfase
exports.createAlert = args => {
  if (!args.color) {
    args.color = 'dark'
  }

  if (!args.variant) {
    args.variant = args.text ? 'pop' : 'solid'
  }

  if (componentExists('alerts', args.variant, args.color)) {
    return createComponent('alerts', args.variant, args.color, args)
  }

  throw new Error(`Alert not found: ${JSON.stringify(args, null, 2)}`)
}

exports.createAvatar = args => {
  if (!args.size) {
    args.size = 'base'
  }

  if (!args.variant) {
    args.variant = args.name ? 'chip' : 'square'
  }

  if (componentExists('avatars', args.variant, args.size)) {
    return createComponent('avatars', args.variant, args.size, args)
  }

  throw new Error(`Avatar not found: ${JSON.stringify(args, null, 2)}`)
}

exports.createButton = args => {
  if (!args.size) {
    args.size = 'base'
  }

  if (!args.variant) {
    args.variant = args.icon ? 'icon-left' : 'filled'
  }

  if (componentExists('buttons', args.variant, args.size)) {
    return createComponent('buttons', args.variant, args.size, args)
  }

  return Ti.UI.createButton(args)
}

exports.createCard = args => {
  if (!args.color) {
    args.color = 'dark'
  }

  if (!args.variant) {
    if (!args.variant) {
      args.variant = args.image ? 'showcase' : args.subtitle ? 'content' : 'code'
    }
  }

  if (componentExists('cards', args.variant, args.color)) {
    return createComponent('cards', args.variant, args.color, args)
  }

  throw new Error(`Card not found: ${JSON.stringify(args, null, 2)}`)
}

// ! Components
exports.createTikitAlert = args => {
  let kitComponent = Ti.UI.createView(args)

  if (args.dismissible) {
    kitComponent.addEventListener('click', tiKitEvent)
  }

  if (args.classes) {
    kitComponent.applyProperties(createStyles(args.classes.split(' '), 'Ti.UI.View'))
  }

  kitComponent.animate({ opacity: 1, delay: args.delay !== undefined ? args.delay : 0, duration: args.duration !== undefined ? args.duration : 250 })

  return kitComponent
}

exports.createTikitAvatar = args => {
  if (args.border) {
    args.borderWidth = 2
    args.borderColor = '#fff'
  }

  let kitComponent = (args.component === 'avatar') ? Ti.UI.createImageView(args) : Ti.UI.createView(args)

  if (args.classes) {
    kitComponent.applyProperties(createStyles(args.classes.split(' '), 'Ti.UI.View'))
  }

  // For stacked avatars
  if (args.last) {
    kitComponent.applyProperties({ right: null })
  }

  return kitComponent
}

exports.createTikitButton = args => {
  let kitComponent = (OS_IOS) ? Ti.UI.createButton(args) : Ti.UI.createView(args)

  if (args.classes) {
    kitComponent.applyProperties(createStyles(args.classes.split(' '), (OS_IOS) ? 'Ti.UI.Button' : 'Ti.UI.View'))
  }

  return kitComponent
}

exports.createTikitCard = args => {
  let kitComponent = Ti.UI.createView(args)

  if (args.classes) {
    kitComponent.applyProperties(createStyles(args.classes.split(' '), 'Ti.UI.View'))
  }

  if (args.rounded >= 0 && Number.isInteger(args.rounded)) {
    kitComponent.applyProperties({ borderRadius: args.rounded * 4 })
  }

  return kitComponent
}

exports.createTikitCode = args => {
  let kitComponent = Ti.UI.createView(args)

  if (args.copy || args.close) {
    kitComponent.addEventListener('click', tiKitCodeEvent)
  }

  if (args.classes) {
    kitComponent.applyProperties(createStyles(args.classes.split(' ').filter((classes) => !classes.includes('bg-')), 'Ti.UI.View'))
  }

  return kitComponent
}

// !Helper Functions
function tiKitEvent({ source }) {
  // Remove alert
  if (source.component === 'alert') {
    source.removeEventListener('click', tiKitEvent)

    source.animate({ opacity: 0, duration: (source.duration) ? source.duration : 250 }, () => {
      source.parent.remove(source)
    })
  }
}

function tiKitCodeEvent({ source }) {
  if (source.btn === 'copy') {
    Ti.UI.Clipboard.setText(source.value)
    source.applyProperties({ title: L('copied', 'Copied') })
    setTimeout(() => source.applyProperties({ title: L('copy', 'Copy') }), 1500)
  } else if (source.btn === 'close') {
    source.parent.parent.hide()
  }
}

function componentExists(_component, _variant, _file) {
  return Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, `/alloy/controllers/tikit/${_component}/${_variant}/${_file}.js`).exists()
}

function createComponent(component, variant, file, args) {
  let componentView = Alloy.createController(`tikit/${component}/${variant}/${file}`, args).getView()

  componentView._elements = {
    icon: componentView.getViewById('icon'),
    name: componentView.getViewById('name'),
    text: componentView.getViewById('text'),
    image: componentView.getViewById('image'),
    title: componentView.getViewById('title'),
    subtitle: componentView.getViewById('subtitle')
  }

  componentView.updateElement = (_value, _element) => {
    if (componentView._elements[_element]) {
      let props = {}

      if (_element === 'title' || _element === 'subtitle' || _element === 'name') {
        props = { text: _value }
      } else if (_element === 'text') {
        props = { text: _value, value: _value, height: Ti.UI.SIZE }
      } else if (_element === 'image') {
        props = { image: _value }
      } else if (_element === 'icon') {
        props = _value
      }

      componentView._elements[_element].applyProperties(props)
    }
  }

  componentView.updateIcon = _args => componentView.updateElement(_args, 'icon')
  componentView.updateName = _args => componentView.updateElement(_args, 'name')
  componentView.updateText = _args => componentView.updateElement(_args, 'text')
  componentView.updateImage = _args => componentView.updateElement(_args, 'image')
  componentView.updateTitle = _args => componentView.updateElement(_args, 'title')
  componentView.updateSubtitle = _args => componentView.updateElement(_args, 'subtitle')

  componentView.update = _args => {
    if (_args.icon) {
      componentView.updateElement(_args.icon, 'icon')
    }
    if (_args.name) {
      componentView.updateElement(_args.name, 'name')
    }
    if (_args.text) {
      componentView.updateElement(_args.text, 'text')
    }
    if (_args.image) {
      componentView.updateElement(_args.image, 'image')
    }
    if (_args.title) {
      componentView.updateElement(_args.title, 'title')
    }
    if (_args.subtitle) {
      componentView.updateElement(_args.subtitle, 'subtitle')
    }
  }

  return componentView
}

function createStyles(_styles, _view) {
  // apiName is not included in `Alloy.createStyle` to avoid getting extra properties from `index`
  let styles = Alloy.createStyle('index', { classes: _styles.filter(Boolean) })

  styles.apiName = _view

  return styles
}

function labelToImage(_styles) {
  if (_styles.font && !_styles.font.fontSize) {
    _styles.font.fontSize = 26
  }

  return Ti.UI.createLabel(_styles).toImage()
}

// ! createAnnotation still in development!!
exports.createAnnotation = args => {
  let Map = require('ti.map')

  if (args.image && args.image.includes(' ')) {
    let theLabel = Ti.UI.createLabel({ text: args.title, color: '#fff' })
    let theContainer = Ti.UI.createView({ layout: 'vertical', width: Ti.UI.SIZE, height: Ti.UI.SIZE })
    let theIcon = Ti.UI.createImageView({ image: labelToImage(createStyles(args.image.split(' '), 'Ti.UI.Label')) })

    theContainer.add(theIcon)
    theContainer.add(theLabel)

    args.image = theContainer.toImage()
  }

  return Map.createAnnotation(args)
}
