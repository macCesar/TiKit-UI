exports.components = {
  alerts: {
    base: 'color',
    help: 'Alerts\' Help',
    templates: ['pop', 'solid', 'callout'],
    properties: [
      { name: 'danger', color: 'red-500', icon: 'fas fa-minus-circle' },
      { name: 'dark', color: 'gray-600', icon: 'fas fa-circle-check' },
      { name: 'info', color: 'cyan-500', icon: 'fas fa-info-circle' },
      { name: 'light', color: 'gray-400', icon: 'fas fa-circle-check' },
      { name: 'primary', color: 'primary', icon: 'fas fa-circle-check' },
      { name: 'success', color: 'green-500', icon: 'fas fa-circle-check' },
      { name: 'secondary', color: 'secondary', icon: 'fas fa-circle-check' },
      { name: 'warning', color: 'yellow-500', icon: 'fas fa-exclamation-circle' }
    ]
  },
  cards: {
    base: 'color',
    help: 'Cards\' Help',
    templates: ['content', 'code', 'showcase', 'quote'],
    properties: [
      { name: 'white', color: 'white', text: 'gray-950' },
      { name: 'dark', color: 'gray-700', text: 'white' },
      { name: 'light', color: 'gray-500', text: 'white' },
      { name: 'black', color: 'gray-950', text: 'white' },
    ]
  },
  avatars: {
    // , "circular", "circular-border", "square"", "stacked", "portrait"
    base: 'size',
    help: 'Avatars\' Help',
    templates: ['circular', 'square', 'stacked', 'chip', 'portrait', 'landscape'],
    properties: [
      { name: 'xs', size: '8', rounded: '10', width: '10', height: '14', negativeMargin: '2' },
      { name: 'sm', size: '10', rounded: '12', width: '12', height: '16', negativeMargin: '3' },
      { name: 'base', size: '12', rounded: '14', width: '14', height: '(72)', negativeMargin: '4' },
      { name: 'lg', size: '14', rounded: '16', width: '16', height: '20', negativeMargin: '5' },
      { name: 'xl', size: '16', rounded: '(2.25rem)', width: '(72)', height: '(88)', negativeMargin: '6' },
      { name: '2xl', size: '20', rounded: '(2.75rem)', width: '20', height: '24', negativeMargin: '7' }
    ]
  },
  buttons: {
    base: 'size',
    help: 'Buttons\' Help',
    templates: ['border-rounded', 'border', 'filled-rounded', 'filled', 'icon-left', 'icon-right'],
    properties: [
      { name: 'xs', size: '6', iconWidth: '6' },
      { name: 'sm', size: '7', iconWidth: '7' },
      { name: 'base', size: '8', iconWidth: '8' },
      { name: 'lg', size: '9', iconWidth: '8' },
      { name: 'xl', size: '10', iconWidth: '9' },
      { name: '2xl', size: '11', iconWidth: '10' }
    ]
  },
  forms: {
    base: 'color',
    help: 'Forms\' Help',
    templates: ['input'],
    properties: [
      { name: 'danger', hint: 'red-300', border: 'red-500', label: 'red-500', text: 'red-600' },
      { name: 'info', hint: 'cyan-300', border: 'cyan-500', label: 'cyan-500', text: 'cyan-600' },
      { name: 'success', hint: 'green-300', border: 'green-500', label: 'green-500', text: 'green-600' },
      { name: 'warning', hint: 'yellow-300', border: 'yellow-500', label: 'yellow-500', text: 'yellow-600' },

      { name: 'white', hint: 'gray-300', border: 'white', label: 'white', text: 'gray-950' },
      { name: 'dark', hint: 'gray-400', border: 'gray-600', label: 'gray-600', text: 'gray-700' },
      { name: 'light', hint: 'gray-300', border: 'gray-400', label: 'gray-400', text: 'gray-500' },
      { name: 'black', hint: 'gray-500', border: 'gray-900', label: 'gray-900', text: 'gray-950' },

      { name: 'primary', hint: 'primary-300', border: 'primary-800', label: 'primary-900', text: 'primary' },
      { name: 'secondary', hint: 'secondary-300', border: 'secondary-800', label: 'secondary-900', text: 'secondary' }
    ]
  }
}
