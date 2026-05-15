# Changelog

All notable changes to TiKit are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] — 2026-05-14

### Added

- **Forms `switch` variant**: wraps `Ti.UI.Switch` with `tint-color-*` / `on-tint-*` / `thumb-*` PurgeTSS theming. `getValue()` returns a real boolean; `isValid()` is a no-op (booleans are always defined).
- **Forms `date` and `time` variants**: tap-to-open modal sheet with a native `Ti.UI.Picker`. Values are stored timezone-free as `YYYY-MM-DD` (date) and `HH:mm` (time). `date` accepts `minDate`/`maxDate`.
- **Forms `select` variant**: tap-to-open modal sheet with a plain picker. Options are passed as a JSON-string XML attribute (`options='[{"title":"S","value":1}]'`) or assigned from a controller; `getValue()` returns the option's `value`, not its title.
- **Forms — Layer 1 keyboard `type` shortcut**: HTML-style values (`text`, `email`, `password`, `number`, `decimal`, `phone`, `url`, `search`) auto-bundle `keyboardType`, `passwordMask`, and `autocorrect`.
- **Forms — Layer 2 direct keyboard props** with friendly string values translated to `Ti.UI.*` constants: `keyboardType`, `keyboardAppearance`, `returnKeyType`, `enableReturnKey`, `suppressReturn`, `passwordMask`, `clearOnEdit`, `maxLength`, `autocapitalization`, `autocorrect`, `autofillType`.
- **Forms — generic `update(args)` bulk method**: pass an object like `{ input, label, error }` to update multiple form elements in one call.
- **Cards — runtime `classes` cascade to inner Labels** (`showcase`, `content`, `quote`, `code` variants): `text-*` and `font-*` classes now reach `title`, `subtitle`, `text`, and `name` labels for instance-specific theming.
- **New runtime helpers** `createTikitTextField` and `createTikitTextArea`: filter incoming `classes` to TextField/TextArea-applicable visual props (`bg-`, `text-`, `hint-text-`, `border-`, `font-`, `rounded`, `p-`).
- **README** — new section `## 🎨 Customizing Components` documenting the three-layer customization model (semantic presets, runtime `classes`, project-level PurgeTSS presets).
- **README** — `### Keyboard Configuration` sub-section under Forms with full prop tables and the Android TextArea `returnKeyType` gotcha.
- **CLI output redesign**: `tikit list`, `tikit help`, and `tikit install` now print the `::TiKit::` prefix once and indent continuation lines for readability. New helpers `logger.startSection`/`endSection`/`block`/`item`.
- **`engines.node`** field declared as `>=20` in `package.json` (required by commander 14).

### Changed

- **Dependencies upgraded** (CommonJS-compatible only — `chalk` and `update-notifier` stay on v4 / v5 to avoid an ESM migration):
  - `commander` `^9.4.1` → `^14.0.3` (requires Node ≥ 20)
  - `fs-extra` `^10.1.0` → `^11.3.4`
  - `lodash` `^4.17.21` → `^4.18.1`
- **`createTikitCode` is now consistent with the other wrappers** — removed the special `!includes('bg-')` filter so users can override the code-card background with `classes="bg-…"` like every other component.
- **CLI typo fix** in `tikit help`: `Avaliable components` → `Available components`.

### Removed

- **Provisional `autocorrect-false` PurgeTSS class** hardcoded on the Form input template. Autocorrect now comes from Layer 1 (`type` bundle) or Layer 2 (`autocorrect="true|false"` prop), defaulting to the native Ti behavior when not specified.

### Fixed

- Forms: `update({ input, label, error })` was missing on the rewritten runtime; only individual `updateInput`/`updateLabel`/`updateError` methods existed. Restored the bulk variant.

## [1.1.9] — 2026-04-29

### Added

- **Forms component**: new `<Form>` with the `input` variant, 10 color presets (`success`, `danger`, `warning`, `info`, `dark`, `light`, `white`, `black`, `primary`, `secondary`), `label`, `value`, `hintText`, `required`, `errorMessage`, and `inputType="textarea"` for multi-line input.
- **Forms validation helpers**: `getValue()` and `isValid(showError)` with a localized error label (`L('this_field_is_required', 'This field is required')`).
- **`id` attribute pass-through** on all component templates so any component can be given a stable Alloy `$.<id>` reference for runtime updates.
- **`CLAUDE.md`** project guide for AI-assisted development covering build pipeline, runtime architecture, default behaviors, and CLI surface.

### Changed

- **Runtime rewrite (`tikit.ui.js`)** to support the new Forms component and an extensible dynamic-update system:
  - New `createForm()` factory plus the `createTikitInput` view helper.
  - Per-component `elementsConfig` (e.g. forms: `['input', 'label', 'error']`, buttons: `['icon', 'text', 'label']`) — `update<Element>()` methods are now auto-generated from the config.

### Fixed

- **White card text contrast**: changed from `text: 'black'` to `text: 'gray-950'` so dark text on the white card variant has the correct PurgeTSS-resolved tone.

## [1.1.8] — 2025-04-29

### Fixed

- Corrected the text-label font size inside the `TikitCard` component.

## [1.1.7] — 2025-04-29

### Added

- Sensible default values for components in `tikit.ui` so most components can be used without explicitly setting every property.

### Changed

- Expanded README with a detailed component-defaults reference for easier onboarding.

## [1.1.6] — 2025-04-29

### Added

- `rounded` property on the `showcase` card variant for customisable corner radius.

### Changed

- Updated showcase documentation to clarify how `rounded` is applied.

## [1.1.5] — 2025-04-29

### Changed

- Refactored XML components to consistently use the `module="tikit.ui"` attribute, ensuring custom factory routing for inner views.
- Added `rounded` property handling in `createImageView` and `createTikitCard`.
- Bumped `tailwindcss` to `3.4.17` and reformatted `tailwind.config.js`.

## [1.1.4] — 2025-04-28

### Added

- `icon` element added to the component view so icon-bearing components can also be updated dynamically.

### Changed

- Major README revamp: clearer introduction, component features, installation instructions, and a dedicated dynamic-update section with examples.

## [1.1.3] — 2025-04-28

### Changed

- Maintenance release — version bump only.

## [1.1.2] — 2025-04-28

### Changed

- Added `module="tikit.ui"` to `Icon` elements across alert and button XML templates for consistent factory routing.

## [1.1.1] — 2025-04-28

### Added

- `updateName` method on the Avatar component for runtime name changes (chip variant).

### Changed

- Documented full component property tables in the README for Cards, Avatars, Alerts, and Buttons.

## [1.1.0] — 2025-04-28

### Added

- Stable `id` references on labels and icons inside Buttons and Cards templates — the foundation for the dynamic `update<Element>()` API.

## [1.0.13] — 2024-04-02

### Fixed

- Minor bug fix.

## [1.0.12] — 2024-01-10

### Changed

- Maintenance release.

## [1.0.11] — 2023-12-31

### Changed

- Updated dependencies and code formatting.
- README polish: added the TiKit UI info and project link.

## [1.0.10] — 2023-11-21

### Changed

- Updated devDependencies, code formatting and cleanup.
- Replaced `gray-900` with `gray-950` across components.

## [1.0.9] — 2023-10-31

### Changed

- Updated to `tailwindcss` 3.3.5.
- Updated `icon-library` command and class sorting.
- ESLint formatting pass.

## [1.0.8] — 2022-12-09

### Fixed

- Validate `_styles.font` inside `labelToImage` to avoid undefined access.
- Cleanup of the `copy` button in the Code variant.

## [1.0.7] — 2022-11-27

### Changed

- Tweaked font-icon size for Tabs.

## [1.0.6] — 2022-11-24

### Changed

- Tweaked font-icon size for Tabs.
- README and button-image updates.

## [1.0.5] — 2022-11-11

### Added

- Introduced the `core/` folder layout that separates templates and scripts.

### Changed

- Documentation polish.

## [1.0.4] — 2022-11-10

### Changed

- Documentation update.
- Reduced bundled image file sizes.

## [1.0.3] — 2022-11-10

### Added

- Instructions and sample images.

### Removed

- Removed `vertical-align-top` from baseline component styles.

## [1.0.2] — 2022-11-09

### Changed

- Standardised all Labels on the `font-regular` class.

## [1.0.1] — 2022-11-07

### Added

- Initial public release of TiKit with Alerts, Avatars, Buttons, Cards, and Tabs primitives, the component generation pipeline (`core/scripts/build-components.js`), and the `tikit` CLI for installing components into Alloy projects.
