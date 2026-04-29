# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TiKit is a UI component library for **Titanium SDK** applications built with **Alloy** and **PurgeTSS**. It provides ready-made components (Alerts, Avatars, Buttons, Cards, Forms, Tabs) with dynamic update capabilities and icon font support.

## Key Commands

### Build Components
```bash
npm run build
```
Runs the component generation system that processes template XML files with property variations to create the complete component library in the `dist/` folder.

### Install TiKit Components (CLI)
```bash
tikit install              # Interactive prompt to select components
tikit install all          # Install all components
tikit install [component]  # Install specific component (alerts, avatars, buttons, cards, forms)
tikit install [component] [variant]  # Install specific variant
tikit list                 # Show available components
tikit list [component]     # Show variants for specific component
```

### Development Tasks
```bash
# Linting (when available)
npm run lint
# No test suite currently configured
```

## Architecture Overview

### Component Generation System
- **Templates**: Source XML files in `core/components/public/[component]/[variant].xml`
- **Property Definitions**: Configuration in `core/scripts/public-components.js` defining variations (colors, sizes, etc.)
- **Build Process**: `core/scripts/build-components.js` processes templates with property substitutions using lodash
- **Output**: Generated components placed in `dist/[component]/[variant]/[property].xml`

### Component Structure
```
core/components/
├── public/           # Template files for each component variant
│   ├── alerts/       # callout.xml, pop.xml, solid.xml
│   ├── avatars/      # chip.xml, circular.xml, landscape.xml, portrait.xml, square.xml, stacked.xml
│   ├── buttons/      # border.xml, border-rounded.xml, filled.xml, filled-rounded.xml, icon-left.xml, icon-right.xml
│   ├── cards/        # code.xml, content.xml, quote.xml, showcase.xml
│   └── forms/        # input.xml
├── private/          # Internal/experimental components
└── lib/              # tikit.ui.js - Core component module
```

### Runtime Component System (`tikit.ui.js`)
- **Factory Functions**: `createAlert()`, `createAvatar()`, `createButton()`, `createCard()`, `createForm()`
- **Default Logic**: Automatically selects variants based on provided properties
- **Dynamic Updates**: All components support `update()`, `updateTitle()`, `updateText()`, etc.
- **Icon Support**: Converts icon class strings to images for tabs and components

### Key Default Behaviors
- **Alerts**: Default to `color="dark"`, `variant="pop"` (with text) or `"solid"` (without text)
- **Avatars**: Default to `size="base"`, `variant="chip"` (with name) or `"square"` (without name)  
- **Buttons**: Default to `size="base"`, `variant="icon-left"` (with icon) or `"filled"` (without icon)
- **Cards**: Default to `color="dark"`, `variant="showcase"` (with image), `"content"` (with subtitle), or `"code"`

### CLI System
- **Entry Point**: `bin/tikit` executable using commander.js
- **Main Logic**: `index.js` with install, list, and help commands
- **Interactive Prompts**: Uses prompts library for component selection
- **File Operations**: Copies from `dist/` to target Alloy project's `app/views/tikit/`

## Component Property System

Components use template substitution with placeholders like `{color}`, `{size}`, `{icon}` that get replaced during build:

- **Colors**: Defined per component (alerts: danger/dark/info/light/primary/success/secondary/warning)
- **Sizes**: Standard scale (xs/sm/base/lg/xl/2xl) with specific pixel/rem values
- **Icons**: FontAwesome classes, Material Icons, or custom icon fonts via PurgeTSS

## Integration Requirements

- **Alloy Framework**: Components are designed as Alloy controllers/views
- **PurgeTSS**: Required for styling and icon font management
- **Titanium SDK**: Native mobile app development platform

## Development Notes

- Template XML files use PurgeTSS utility classes for styling
- Component generation is deterministic based on `public-components.js` configuration
- The `tikit.ui.js` module provides runtime component creation and update methods
- CLI validates Alloy project structure before installing components
- FontAwesome installation check prompts users to install via PurgeTSS if missing