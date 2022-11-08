# Welcome to TiKit UI Components
TiKit is a collection of UI components for Titanium that are built on top of Alloy and PurgeTSS.

## Installation
To install it on your machine, run the following command in the terminal:

```bash
> [sudo] npm install -g tikit
```

Please have **PurgeTSS** installed as well:

```bash
> [sudo] npm install -g purgetss
```

## Installing the components
Once everything is installed on your machine, create a new Alloy project using **PurgeTSS**, *make sure you have `app.idprefix` and `app.idprefix` [settings configured.](https://purgetss.com/docs/commands#requirments)*

```bash
> purgetss create myApp
```

Then, run `tikit install` and follow an interactive select prompt:

```bash
> tikit install
? Choose a component to install › - Use arrow-keys. Return to submit.
❯   all components
    alerts
    avatars
    buttons
    cards
```

## Available components and their variants

### Alerts
An alert displays a short and important message attracting the user's attention without interrupting the user's task.

TiKit Alert Component contains 3 variants:
- callout
- pop
- solid

With 6 main colors each: success, danger, warning, info, dark and light.

And 2 custom colors for each variant called: primary and secondary.

You can add your own color values using the `shades` command in **PurgeTSS**:

```bash
> purgetss shades '#hexcode1' primary
> purgetss shades '#hexcode2' secondary
```

```xml
<Alert module="tikit.ui" variant="pop" color="info" delay="500" dismissible="true" title="Dismissible Alert" text="Lorem ipsum dolor sit..."/>
```

#### Addtional properties
Use `delay` to display the alert after a period of time and `duration` to set the speed of the animation. Both properties are in milliseconds.

Set the `dismissible` property to true to close it when the user clicks/taps on it.

### Avatars
Use Avatars to portray people or objects. It can be used as a visual identifier for a user profile on your app.

TiKit Avatar Component contains 5 variants:
- chip
- circular
- squared
- portrait
- landscape
- stacked

With 6 different sizes each: xs, sm, md, lg, xl and 2xl.

### Buttons
Buttons allow the user to take actions or make choices.

TiKit Button Component contains 6 variants:
- border
- border-rounded
- filled
- filled-rounded
- icon-left
- icon-right

With 6 different sizes each: xs, sm, base, lg, xl and 2xl.

### Cards
Cards are used to group and display content in a way that is easily readable, it serves as an entry point to more detailed information.

TiKit Card Component contains 4 variants:
- code
- content
- quote
- showcase

With 4 colors each: black, dark, light and white.

### Tabs
The Tab component returns an instance of Titanium.UI.Tab that includes a custom icon created with an icon font such as FontAwesome, Material Icons or any other icon font of your choice.

By setting the 'title', 'icon' and 'activeIcon' (iOS only) properties, you'll get a Tab component with the icons nicely rendered.

The 'icon' property is defined with the icon font name and the icon code, for example: 'fa fa-home' or 'mi mi-home'.

#### Additional properties
These are regular Titanium.UI.Tab objects, so you can use all the properties and methods available for them.

For example you can set active tint and title color for each tab by using the 'activeTintColor' and 'activeTitleColor' properties:

```xml
<Tab module="tikit.ui" class="active-tint-violet-900 active-title-violet-900" title="Tabs" icon="mio mi-security_update_good text-3xl" activeIcon="mit mi-security_update_good text-3xl">
  <Require src="sections/tabs"/>
</Tab>
```
