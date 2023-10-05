exports.components = {
  alerts: {
    base: 'color',
    help: 'Alerts\' Help',
    templates: ['pop', 'solid', 'callout'],
    properties: [
      { name: 'info', color: 'cyan-500', icon: 'fas fa-info-circle' },
      { name: 'danger', color: 'red-500', icon: 'fas fa-minus-circle' },
      { name: 'primary', color: 'primary', icon: 'fas fa-circle-check' },
      { name: 'success', color: 'green-500', icon: 'fas fa-circle-check' },
      { name: 'secondary', color: 'secondary', icon: 'fas fa-circle-check' },
      { name: 'warning', color: 'yellow-500', icon: 'fas fa-exclamation-circle' },
      { name: 'dark', color: 'gray-600', icon: 'fas fa-circle-check' },
      { name: 'light', color: 'gray-400', icon: 'fas fa-circle-check' },
    ]
  },
  cards: {
    base: 'color',
    help: 'Cards\' Help',
    templates: ['content', 'code', 'showcase', 'quote'],
    properties: [
      { name: 'black', color: 'gray-900', text: 'white' },
      { name: 'dark', color: 'gray-700', text: 'white' },
      { name: 'light', color: 'gray-500', text: 'white' },
      { name: 'white', color: 'white', text: 'black' }
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
  }
}
