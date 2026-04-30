// TiKit UI v1.1.9
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

exports.createForm = args => {
  if (!args.color) {
    args.color = 'dark'
  }

  if (!args.variant) {
    args.variant = 'input'
  }

  resolveFormArgs(args)

  if (componentExists('forms', args.variant, args.color)) {
    return createComponent('forms', args.variant, args.color, args)
  }

  throw new Error(`Form not found: ${JSON.stringify(args, null, 2)}`)
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
    kitComponent.applyProperties(createStyles(args.classes.split(' '), 'Ti.UI.View'))
  }

  return kitComponent
}

exports.createTikitInput = args => {
  let kitComponent = Ti.UI.createView(args)

  if (args.classes) {
    kitComponent.applyProperties(createStyles(args.classes.split(' '), 'Ti.UI.View'))
  }

  return kitComponent
}

exports.createTikitTextField = args => {
  let kitComponent = Ti.UI.createTextField(args)

  if (args.classes) {
    kitComponent.applyProperties(createStyles(args.classes.split(' ').filter((classes) =>
      /^(bg-|text-|hint-text-|border-|font-|rounded|p-)/.test(classes)
    ), 'Ti.UI.TextField'))
  }

  return kitComponent
}

exports.createTikitTextArea = args => {
  let kitComponent = Ti.UI.createTextArea(args)

  if (args.classes) {
    kitComponent.applyProperties(createStyles(args.classes.split(' ').filter((classes) =>
      /^(bg-|text-|hint-text-|border-|font-|rounded|p-)/.test(classes)
    ), 'Ti.UI.TextArea'))
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

function resolveFormArgs(args) {
  const KEYBOARD_TYPES = {
    'default': Ti.UI.KEYBOARD_TYPE_DEFAULT,
    'ascii': Ti.UI.KEYBOARD_TYPE_ASCII,
    'decimal': Ti.UI.KEYBOARD_TYPE_DECIMAL_PAD,
    'email': Ti.UI.KEYBOARD_TYPE_EMAIL,
    'namephone': Ti.UI.KEYBOARD_TYPE_NAMEPHONE_PAD,
    'number': Ti.UI.KEYBOARD_TYPE_NUMBER_PAD,
    'numbers-punctuation': Ti.UI.KEYBOARD_TYPE_NUMBERS_PUNCTUATION,
    'phone': Ti.UI.KEYBOARD_TYPE_PHONE_PAD,
    'twitter': Ti.UI.KEYBOARD_TYPE_TWITTER,
    'url': Ti.UI.KEYBOARD_TYPE_URL,
    'websearch': Ti.UI.KEYBOARD_TYPE_WEBSEARCH
  }

  const KEYBOARD_APPEARANCES = {
    'default': Ti.UI.KEYBOARD_APPEARANCE_DEFAULT,
    'dark': Ti.UI.KEYBOARD_APPEARANCE_DARK,
    'light': Ti.UI.KEYBOARD_APPEARANCE_LIGHT
  }

  const RETURN_KEYS = {
    'default': Ti.UI.RETURNKEY_DEFAULT,
    'continue': Ti.UI.RETURNKEY_CONTINUE,
    'done': Ti.UI.RETURNKEY_DONE,
    'go': Ti.UI.RETURNKEY_GO,
    'google': Ti.UI.RETURNKEY_GOOGLE,
    'join': Ti.UI.RETURNKEY_JOIN,
    'next': Ti.UI.RETURNKEY_NEXT,
    'route': Ti.UI.RETURNKEY_ROUTE,
    'search': Ti.UI.RETURNKEY_SEARCH,
    'send': Ti.UI.RETURNKEY_SEND,
    'yahoo': Ti.UI.RETURNKEY_YAHOO,
    'emergency-call': Ti.UI.RETURNKEY_EMERGENCY_CALL
  }

  const AUTOCAPS = {
    'none': Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
    'sentences': Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
    'words': Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,
    'all': Ti.UI.TEXT_AUTOCAPITALIZATION_ALL
  }

  const TYPE_BUNDLES = {
    text:     { keyboardType: 'default',   passwordMask: false, autocorrect: true  },
    email:    { keyboardType: 'email',     passwordMask: false, autocorrect: false },
    password: { keyboardType: 'default',   passwordMask: true,  autocorrect: false },
    number:   { keyboardType: 'number',    passwordMask: false, autocorrect: false },
    decimal:  { keyboardType: 'decimal',   passwordMask: false, autocorrect: false },
    phone:    { keyboardType: 'phone',     passwordMask: false, autocorrect: false },
    url:      { keyboardType: 'url',       passwordMask: false, autocorrect: false },
    search:   { keyboardType: 'websearch', passwordMask: false, autocorrect: true  }
  }

  if (args.type && TYPE_BUNDLES[args.type]) {
    Object.keys(TYPE_BUNDLES[args.type]).forEach((key) => {
      if (args[key] === undefined) args[key] = TYPE_BUNDLES[args.type][key]
    })
  }

  if (typeof args.keyboardType === 'string' && KEYBOARD_TYPES[args.keyboardType] !== undefined) {
    args.keyboardType = KEYBOARD_TYPES[args.keyboardType]
  }
  if (typeof args.keyboardAppearance === 'string' && KEYBOARD_APPEARANCES[args.keyboardAppearance] !== undefined) {
    args.keyboardAppearance = KEYBOARD_APPEARANCES[args.keyboardAppearance]
  }
  if (typeof args.returnKeyType === 'string' && RETURN_KEYS[args.returnKeyType] !== undefined) {
    args.returnKeyType = RETURN_KEYS[args.returnKeyType]
  }
  if (typeof args.autocapitalization === 'string' && AUTOCAPS[args.autocapitalization] !== undefined) {
    args.autocapitalization = AUTOCAPS[args.autocapitalization]
  }

  if (args.passwordMask === 'true') args.passwordMask = true
  else if (args.passwordMask === 'false') args.passwordMask = false

  if (args.clearOnEdit === 'true') args.clearOnEdit = true
  else if (args.clearOnEdit === 'false') args.clearOnEdit = false

  if (args.enableReturnKey === 'true') args.enableReturnKey = true
  else if (args.enableReturnKey === 'false') args.enableReturnKey = false

  if (args.suppressReturn === 'true') args.suppressReturn = true
  else if (args.suppressReturn === 'false') args.suppressReturn = false

  if (args.autocorrect === 'true') args.autocorrect = true
  else if (args.autocorrect === 'false') args.autocorrect = false

  if (typeof args.maxLength === 'string') {
    const n = Number(args.maxLength)
    if (!isNaN(n)) args.maxLength = n
  }
}

function componentExists(component, variant, file) {
  return Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, `/alloy/controllers/tikit/${component}/${variant}/${file}.js`).exists()
}

function createComponent(component, variant, file, args) {
  let componentView = Alloy.createController(`tikit/${component}/${variant}/${file}`, args).getView()

  if (!componentView) {
    console.error(`Failed to load component view for ${component}/${variant}/${file}`)
    return null
  }

  // Define elements based on the component type
  const elementsConfig = {
    forms: ['input', 'label', 'error'],
    buttons: ['icon', 'text', 'label'],
    default: ['icon', 'name', 'text', 'image', 'title', 'label', 'error', 'subtitle', 'input'],
  }

  const elementsToInclude = elementsConfig[component] || elementsConfig.default

  const tempElements = {}
  elementsToInclude.forEach((element) => {
    const viewElement = componentView.getViewById(element)
    if (viewElement) {
      tempElements[element] = viewElement
    }
  })
  componentView.elements = tempElements

  // Common methods for all components
  componentView.getValue = () => componentView.elements['input']?.value || null

  componentView.isValid = (showError) => {
    let valid = true
    let errorMessage = ''
    let currentValue = componentView.elements['input']?.value || ''

    if (componentView.elements['input']?.required && !currentValue.trim()) {
      valid = false
      errorMessage = L('this_field_is_required', 'This field is required')
    }

    if (showError !== false) {
      if (valid) {
        componentView.elements['error']?.applyProperties({ text: '', visible: false })
      } else {
        componentView.elements['error']?.applyProperties({ text: errorMessage, visible: true })
      }
    }

    return valid
  }

  componentView.updateElement = (value, element) => {
    if (componentView.elements[element]) {
      let props = {}

      if (['title', 'subtitle', 'name', 'label', 'error'].includes(element)) {
        props = { text: value }
      } else if (element === 'text') {
        props = { text: value, value: value, height: Ti.UI.SIZE }
      } else if (element === 'image') {
        props = { image: value }
      } else if (element === 'input') {
        props = { value: value }
      } else if (element === 'icon') {
        props = value
      }

      componentView.elements[element].applyProperties(props)
    } else {
      console.warn(`Cannot update element '${element}' because it does not exist.`)
    }
  }

  elementsToInclude.forEach((element) => {
    componentView[`update${element.charAt(0).toUpperCase() + element.slice(1)}`] = (value) =>
      componentView.updateElement(value, element)
  })

  componentView.update = (values) => {
    Object.keys(values).forEach((element) => {
      if (componentView.elements[element]) {
        componentView.updateElement(values[element], element)
      } else {
        console.warn(`Cannot update element '${element}' because it does not exist.`)
      }
    })
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

// ! Deprecated
function createComponentXXX(component, variant, file, args) {
  let componentView = Alloy.createController(`tikit/${component}/${variant}/${file}`, args).getView()

  componentView.elements = {
    name: componentView.getViewById('name'),
    text: componentView.getViewById('text'),

    icon: componentView.getViewById('icon'),
    image: componentView.getViewById('image'),

    label: componentView.getViewById('label'),
    input: componentView.getViewById('input'),
    error: componentView.getViewById('error'),

    title: componentView.getViewById('title'),
    subtitle: componentView.getViewById('subtitle'),
  }

  componentView.getValue = () => componentView.elements['input'].value

  componentView.isValid = (showError) => {
    let valid = true
    let errorMessage = ''
    let currentValue = componentView.elements['input'].value

    if (componentView.elements['input'].required && !currentValue.trim()) {
      valid = false
      errorMessage = L('this_field_is_required', 'This field is required')
    }

    if (valid && args.validationRegex && currentValue.trim()) {
      let regex = new RegExp(args.validationRegex)
      if (!regex.test(currentValue)) {
        valid = false
        errorMessage = args.validationErrorMessage || L('formato_invalido', 'Formato inválido') // Mensaje de error personalizado o genérico
      }
    }

    if (showError !== false) { // Mostrar error por defecto si no se especifica lo contrario
      if (valid) {
        componentView.elements['error'].applyProperties({ text: '', visible: false })
      } else {
        componentView.elements['error'].applyProperties({ text: errorMessage, visible: true })
      }
    }

    return valid
  }

  componentView.updateElement = (value, element) => {
    if (componentView.elements[element]) {
      let props = {}

      if (element === 'title' || element === 'subtitle' || element === 'name' || element === 'label' || element === 'error') {
        props = { text: value }
      } else if (element === 'text') {
        props = { text: value, value: value, height: Ti.UI.SIZE }
      } else if (element === 'image') {
        props = { image: value }
      } else if (element === 'input') {
        props = { value: value }
      } else if (element === 'icon') {
        props = value
      }

      componentView.elements[element].applyProperties(props)
    }
  }

  componentView.updateIcon = _args => componentView.updateElement(_args, 'icon')
  componentView.updateName = _args => componentView.updateElement(_args, 'name')
  componentView.updateText = _args => componentView.updateElement(_args, 'text')
  componentView.updateImage = _args => componentView.updateElement(_args, 'image')
  componentView.updateTitle = _args => componentView.updateElement(_args, 'title')
  componentView.updateInput = _args => componentView.updateElement(_args, 'input')
  componentView.updateError = _args => componentView.updateElement(_args, 'error')
  componentView.updateLabel = _args => componentView.updateElement(_args, 'label')
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
    if (_args.input) {
      componentView.updateElement(_args.input, 'input')
    }
    if (_args.label) {
      componentView.updateElement(_args.label, 'label')
    }
    if (_args.error) {
      componentView.updateElement(_args.error, 'error')
    }
  }

  return componentView
}
