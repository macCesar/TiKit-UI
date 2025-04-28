# Welcome to TiKit UI Components

<div align="center">

![npm](https://img.shields.io/npm/dm/tikit)
![npm](https://img.shields.io/npm/v/tikit)
![NPM](https://img.shields.io/npm/l/tikit)

</div>

TiKit is a comprehensive collection of beautifully designed UI components for **Titanium SDK**, built on top of **Alloy** and **PurgeTSS**. It empowers developers to create stunning mobile applications with consistent and modern user interfaces while reducing development time.

### Key Features

- **Ready-to-Use Components**: Alerts, Avatars, Buttons, Cards, and Tabs with multiple variants and customization options
- **Utility-First Approach**: Leverages PurgeTSS's utility classes for flexible styling without writing complex TSS files
- **Dynamic Updates**: Update component properties on-the-fly without recreating the entire component
- **Icon Font Integration**: Built-in support for FontAwesome, Material Icons and other popular icon libraries
- **Consistent Design Language**: Professionally designed components that work harmoniously together
- **Fully Customizable**: Easily adapt components to match your brand's identity with color and style options
- **Lightweight**: Optimized for performance with minimal overhead

TiKit streamlines the UI development process in Titanium apps by providing a toolkit of components that are both visually appealing and functionally robust, allowing you to focus on building great app experiences rather than wrestling with UI implementation details.

![TiKit Poster](./assets/images/tikit-poster.png)


## Installation
To install it, run the following command in the terminal:

```bash
> [sudo] npm install -g tikit
```

Ensure that you also have **PurgeTSS** installed:

```bash
> [sudo] npm install -g purgetss
```


## Installing the components
Once everything is installed on your machine, create a new Alloy project using **PurgeTSS**. Ensure that you have the `app.idprefix` and `app.idprefix` [settings configured.](https://purgetss.com/docs/commands/#requirements)*

```bash
> purgetss create myApp
```

Next, run `tikit install` and follow the interactive selection prompt:

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


## Alerts
> #### General properties: variant, color, and classes

An alert is designed to display a concise and crucial message, capturing the user's attention without disrupting their ongoing task.

**The TiKit Alert Component includes three variants:**
* callout
* pop
* solid

Each of these variants comes in six primary colors: *success*, *danger*, *warning*, *info*, *dark*, and *light*.

Additionally, there are two custom colors available for each variant, named *primary* and *secondary*.

You can introduce your custom color values using the `shades` command in **PurgeTSS**:

```bash
> purgetss shades '#hexcode1' primary
> purgetss shades '#hexcode2' secondary
```

> #### Additional properties: delay, duration, and dismissible

Use the `delay` property to specify when the alert should appear after a specified time, and the `duration` property to control the speed of the animation. Both of these properties are measured in milliseconds.

Set the `dismissible` property to true if you want the alert to close when the user clicks or taps on it.

```xml
<Alert module="tikit.ui" variant="pop" color="info" delay="500" dismissible="true" title="Dismissible Alert" text="Lorem ipsum dolor sit..." />
```


### callout
> #### Properties: title and text

This represents a simple alert with a title and a concise description.

```xml title="callout variant"
<Alert module="tikit.ui" variant="callout" color="success" title="Callout variant" text="Lorem ipsum dolor sit..." />
```

<p align="center">
  <img src="./assets/images/alerts/callout.png" width="375" alt="Alerts callout variant" />
</p>


### pop
> #### Properties: title, text, and icon

The "pop" variant of alerts is designed to include a predefined icon that highlights the message.

You can employ icon fonts like FontAwesome, Material Icons, or any other icon font of your preference.

Modify the icon by utilizing the `icon` property, and adjust its size using any of **PurgeTSS**'s font size classes:

```xml title="pop variant with custom icon"
<Alert module="tikit.ui" variant="pop" color="primary" title="Primary Alert with custom Icon" text="Lorem ipsum dolor sit..." icon="mi mi-pending_actions text-3xl" />
```

<p align="center">
  <img src="./assets/images/alerts/pop.png" width="375" alt="Alerts pop variant" />
</p>


### solid
> #### Properties: title and icon

The "solid" variant represents a full-width, solid banner that includes a title and a predefined icon.

Similar to the `pop` variant, you can customize its icon using the `icon` property and adjust its size by utilizing any of **PurgeTSS**'s font size classes.

```xml title="solid variant with custom icon"
<Alert module="tikit.ui" variant="solid" color="primary" title="Primary Alert with custom Icon" icon="mi mi-pending_actions text-2xl" />
```

<p align="center">
  <img src="./assets/images/alerts/solid.png" width="375" alt="Alerts solid variant" />
</p>


## Avatars
> #### General properties: variant, size, and classes

Avatars are a useful tool for representing people or objects and can serve as visual identifiers for user profiles within your app.

**The TiKit Avatar Component offers six variants:**

* chip
* circular
* landscape
* portrait
* square
* stacked

**Each variant comes in six different sizes**: *xs*, *sm*, *base*, *lg*, *xl* and *2xl*.

```xml title="Avatar Component"
<Avatar module="tikit.ui" variant="chip" size="base" name="John Doe" image="link-to-image.jpg" />
```


### chip
> #### Properties: name, and image

The "chip" variant allows you to specify the name of the person and an image to display. You can use a local filesystem path, a remote URL, or a Blob object containing image data.

By default, the colors for the "chip" variant are set to `bg-gray-200` and `text-gray-500`. If you wish to change these colors, you can do so using the classes property, as demonstrated in the example below.

```xml title="chip variant with custom colors"
<Avatar module="tikit.ui" variant="chip" size="base" name="Mr. John Doe" image="https://randomuser.me/api/portraits/men/86.jpg" classes="bg-violet-900 text-violet-50" />
```

<p align="center">
  <img src="./assets/images/avatars/chip.png" width="375" alt="Avatars chip variant" />
</p>


### circular
> #### Properties: name, image, and border

For the "circular" variant, you can specify the name, image, and whether to display a white border around the image. Set the `border` property to true to show the white border.

To further customize the border color, you can utilize the `classes` prop.

```xml title="circular variant with custom colors"
<Avatar module="tikit.ui" variant="circular" size="base" border="true" image="https://randomuser.me/api/portraits/men/86.jpg" />
```

<p align="center">
  <img src="./assets/images/avatars/circular.png" width="375" alt="Avatars circular variant" />
</p>


### square
> #### Properties: name, image, and border

In the "square" variant, you can define the name, image, and choose whether to display a white border around the image. To enable the white border, set the `border` property to true.

For additional control over the border color, you can make use of the `classes` prop.

```xml title="square variant with custom colors"
<Avatar module="tikit.ui" variant="square" size="base" border="true" classes="border-violet-900" image="https://randomuser.me/api/portraits/men/86.jpg" />
```

<p align="center">
  <img src="./assets/images/avatars/square.png" width="375" alt="Avatars square variant" />
</p>


### portrait
> #### Properties: name and image

The "portrait" variant allows you to specify the name and image. To customize the border color, utilize the `classes` prop.

By default, the border color is set to `border-gray-500`. To change this color, you can make use of the `classes` prop.

```xml title="portrait variant with custom colors"
<Avatar module="tikit.ui" variant="portrait" size="base" classes="border-violet-900" image="https://randomuser.me/api/portraits/men/86.jpg" />
```

<p align="center">
  <img src="./assets/images/avatars/portrait.png" width="375" alt="Avatars portrait variant" />
</p>


### landscape
> #### Properties: name and image

The "landscape" variant permits you to define the name and image. If you want to modify the border color, you can do so using the `classes` prop.

By default, the border color is set to `border-gray-500`. To alter this color, utilize the `classes` prop.

```xml title="landscape variant with custom colors"
<Avatar module="tikit.ui" variant="landscape" size="base" classes="border-violet-900" image="https://randomuser.me/api/portraits/men/86.jpg" />
```

<p align="center">
  <img src="./assets/images/avatars/landscape.png" width="375" alt="Avatars landscape variant" />
</p>


### stacked
> #### Properties: title, icon, and last

In the "stacked" variant, you can specify the title, icon, and use the `last` property to properly adjust the right margin of the last avatar in a stack. Setting `last` to true for the last avatar ensures the appropriate right margin.

```xml title="stacked variant"
<View class="horizontal">
  <Avatar module="tikit.ui" variant="stacked" size="base" image="https://randomuser.me/api/portraits/men/86.jpg" />
  <Avatar module="tikit.ui" variant="stacked" size="base" image="https://randomuser.me/api/portraits/men/87.jpg" />
  <Avatar module="tikit.ui" variant="stacked" size="base" image="https://randomuser.me/api/portraits/men/62.jpg" />
  <Avatar module="tikit.ui" variant="stacked" size="base" last="true" image="https://randomuser.me/api/portraits/men/88.jpg" />
</View>
```

<p align="center">
  <img src="./assets/images/avatars/stacked.png" width="375" alt="Avatars stacked variant" />
</p>


## Buttons
> #### General properties: variant, size, and classes

Buttons are interactive elements that enable users to take actions or make choices.

**The TiKit Button Component offers six variants:**
* border
* border-rounded
* filled
* filled-rounded
* icon-left
* icon-right

**Each variant is available in six different sizes**: *xs*, *sm*, *base*, *lg*, *xl* and *2xl*.

```xml
<Button module="tikit.ui" variant="border" size="lg" title="Button Name" />
```


### border
> #### Property: title

For the "border" variant, you can set the title. To change the color of the title and border, utilize the `classes` property.

```xml title="border variant"
<Button module="tikit.ui" variant="border" size="base" title="Border" classes="border-violet-900 text-violet-900" />
```

<p align="center">
  <img src="./assets/images/buttons/border-iphone.png" width="375" alt="Buttons border variant" />
</p>


### border-rounded
> #### Property: title

In the "border-rounded" variant, you can specify the title. To customize the color of both the title and border, make use of the `classes` property.

```xml title="border-rounded variant"
<Button module="tikit.ui" variant="border-rounded" size="base" title="Border Rounded" classes="border-violet-900 text-violet-900" />
```

<p align="center">
  <img src="./assets/images/buttons/border-rounded-iphone.png" width="375" alt="Buttons border-rounded variant" />
</p>


### filled
> #### Property: title

For the "filled" variant, you can set the title. To modify the color of both the title and the background, utilize the `classes` property.

```xml title="filled variant"
<Button module="tikit.ui" variant="filled" size="base" title="Filled" classes="text-violet-50 bg-violet-900" />
```

<p align="center">
  <img src="./assets/images/buttons/filled-iphone.png" width="375" alt="Buttons filled variant" />
</p>


### filled-rounded
> #### Property: title

In the "filled-rounded" variant, you can specify the title. To customize the color of both the title and background, make use of the `classes` property.

```xml title="filled-rounded variant"
<Button module="tikit.ui" variant="filled-rounded" size="base" title="Filled Rounded" classes="text-violet-50 bg-violet-900" />
```

<p align="center">
  <img src="./assets/images/buttons/filled-rounded-iphone.png" width="375" alt="Buttons filled-rounded variant" />
</p>


### icon-left
> #### Properties: title and icon

For the "icon-left" variant, you can set the title and use the `icon` property to change its icon, color, and size.

Additionally, you can modify the color of the title and background by using the `classes` property.

```xml title="icon-left variant"
<Button module="tikit.ui" variant="icon-left" size="base" title="Button" icon="fa fa-file text-violet-50" classes="text-violet-50 bg-violet-900" />
```

<p align="center">
  <img src="./assets/images/buttons/icon-left-iphone.png" width="375" alt="Buttons icon-left variant" />
</p>


### icon-right
> #### Properties: title and icon

In the "icon-right" variant, you can specify the title and utilize the `icon` property to adjust its icon, color, and size.

For further customization, such as changing the color of the title and background, utilize the `classes` property.

```xml title="icon-right variant"
<Button module="tikit.ui" variant="icon-right" size="base" title="Button" icon="fa fa-file text-violet-50" classes="text-violet-50 bg-violet-900" />
```

<p align="center">
  <img src="./assets/images/buttons/icon-left-iphone.png" width="375" alt="Buttons icon-left variant" />
</p>


### Custom Icons
> #### Use any Icon Font Library

You have the flexibility to switch to a different icon from the FontAwesome Icon Library or even opt for a different font vendor. You can achieve this by setting the `icon` property with the appropriate font and icon classes, like `fa fa-file-pdf` or `mi mi-pending_actions`.

Furthermore, you can adjust the icon's size using any of PurgeTSS's font size classes, such as `text-lg` or `text-2xl`.

In the following example, we demonstrate the use of the Material Icons font library.

```xml title="Custom icon and color"
<Button module="tikit.ui" variant="icon-left" size="base" icon="mi mi-pending_actions text-2xl text-violet-50" title="Pending Actions" classes="my-4 font-bold bg-violet-900" />
```

<p align="center">
  <img src="./assets/images/buttons/pending-actions.png" width="375" alt="Buttons custom icon and color" />
</p>


## Cards
> #### General properties: variant, color, and classes

Cards are a valuable tool for grouping and presenting content in a readable manner, often serving as an introduction to more comprehensive information.

**The TiKit Card Component offers four variants:**
* code
* content
* quote
* showcase

**Each variant is available in four different colors**: *black*, *dark*, *light* and *white*.

```xml
<Card module="tikit.ui" variant="code" color="black" copy="true" title="Card Title" text="Some code or text to display!" />
```


### code
> #### Properties: title, text, and copy

The "code" variant is specifically designed for displaying small snippets of code.

You can employ the `copy` property to include a copy button at the top-right corner. The button's title and the alert message are set using Titanium's localization function: `L('copy', 'Copy')` and `L('code_copied', 'Code copied to clipboard!')`, respectively. To personalize and translate these strings, add both "copy" and "code_copied" to your app's target languages (e.g., `app/i18n/xx/strings.xml`).

To enhance the appearance of your code snippets, install a monotype font family of your choice and create a `font-mono` style in `./purgetss/config.js`. In all our examples, we utilize the `FiraCode-Light` font family.

<p align="center">
  <img src="./assets/images/cards/code-variant.png" width="375" alt="Cards code variant" />
</p>


### showcase
> #### Properties: title, text, and image

The "showcase" variant is intended for scenarios where you want to showcase an image alongside a title and a brief description. This variant is particularly useful when you need to present visual content with accompanying information.

```xml title="showcase variant"
<Card module="tikit.ui" variant="showcase" color="black" title="Pocket" text="Mobile app marketing website" image="images/showcase/1.png" />
```

<p align="center">
  <img src="./assets/images/cards/showcase-black.png" width="375" alt="Cards showcase dark" />
</p>


### quote
> #### Properties: name and text

The "quote" variant is designed for situations where you want to display a quotation from someone. This variant allows you to attribute the quote to its source by specifying the name of the person or entity and the text of the quote itself. It's an effective way to showcase quotes within your content.

```xml title="quote variant"
<Card module="tikit.ui" variant="quote" color="black" name="John Doe" text="Quas ullam, quis eius a blanditiis..." />
```

<p align="center">
  <img src="./assets/images/cards/quote-dark.png" width="375" alt="Cards quote dark" />
</p>


### content
> #### Properties: title, subtitle, and text.

The "content" variant is suitable for presenting a block of text content with the following features:

- A large title
- A highlighted subtitle
- Paragraphs of text

This variant is ideal for displaying textual information where you want to emphasize the title and subtitle while providing detailed content in paragraphs.

```xml title="content variant"
<Card module="tikit.ui" variant="content" color="black" title="content variant, black" subtitle="This is a subtitle" text="Alloy.Globals.lorem" />
```

<p align="center">
  <img src="./assets/images/cards/content-dark.png" width="375" alt="Cards content dark" />
</p>


## Tabs
The Tab component provides an instance of **Titanium.UI.Tab**, featuring a custom icon created using an icon font, such as FontAwesome, Material Icons, or any other font of your preference.

By configuring the `title`, `icon`, and `activeIcon` (iOS only) properties, you can create a Tab component with well-rendered icons.

The `icon` property combines the icon font name and the icon code, like `fa fa-home` or `mi mi-home`.

```xml title="Tab component"
<Tab module="tikit.ui" title="Email" icon="far fa-envelope" activeIcon="fas fa-envelope">
  <!-- tab’s-window-content -->
</Tab>
```


### Additional properties

These are standard **Titanium.UI.Tab** objects, so you can utilize all the properties and methods available for them.

For instance, you can set the active tint and title color for each tab using the `activeTintColor` and `activeTitleColor` properties, as demonstrated below:

```xml
<Tab module="tikit.ui" class="active-tint-violet-900 active-title-violet-900" title="Tabs" icon="mio mi-security_update_good text-3xl" activeIcon="mit mi-security_update_good text-3xl">
  <Require src="sections/tabs" />
</Tab>
```

<p align="center">
  <img src="./assets/images/tabs/tabs-violet.png" width="375" alt="Tab Active Tint Violet" />
</p>


## Updating Component Properties Dynamically

TiKit is designed to facilitate dynamic updates to UI components. When you create any TiKit component (such as Cards, Alerts, Avatars, or Buttons), it comes equipped with special methods that allow you to update its properties without having to recreate the component.

These methods make common scenarios easier, such as:
- Updating a Card's text when new data arrives
- Changing an Avatar's image when a user selects a different photo
- Modifying an Alert or Button title after a state change

### Available Methods

1. **`updateTitle(title)`**
   - Updates the `title` property of the component.
     ```javascript
     // In your controller.js file
     $.card.updateTitle('Updated Title');
     ```

2. **`updateSubtitle(subtitle)`**
   - Updates the `subtitle` property of the component.
     ```javascript
     // In your controller.js file
     $.card.updateSubtitle('Updated Subtitle');
     ```

3. **`updateText(text)`**
   - Updates the `text` property of the component. This method also updates the `value` property for components like `TextArea` and adjusts the height dynamically.
     ```javascript
     // In your controller.js file
     $.card.updateText('Updated Text');
     ```

4. **`updateImage(image)`**
   - Updates the `image` property of the component. This is particularly useful for components like `Avatar` or `Card` that display images.
     ```javascript
     // In your controller.js file
     $.avatar.updateImage('/images/updated-profile.jpg');
     ```

5. **`update(args)`**
   - A general-purpose method to update multiple properties of a component at once. It supports `title`, `subtitle`, `text`, and `image`.
     ```javascript
     // In your controller.js file
     $.card.update({
       title: 'Updated Title',
       text: 'Updated Text',
       image: '/images/updated-image.jpg'
     });
     ```

### Supported Components

These methods are available for the following components:

- **Cards** (`<Card>`)
  - Properties: `title`, `subtitle`, `text`, `image`
- **Avatars** (`<Avatar>`)
  - Properties: `image`
- **Alerts** (`<Alert>`)
  - Properties: `title`, `text`
- **Buttons** (`<Button>`)
  - Properties: `title`

### Example Usage

Here's a complete example of how to use these methods with a `Card` component:

**View (index.xml)**:
```xml
<Alloy>
  <Window>
    <View class="vertical mx-4">
      <Card id="dynamicCard" module="tikit.ui" variant="content" color="dark"
            title="Welcome"
            subtitle="Introduction"
            text="This is a dynamic card."
            image="/images/default.jpg" />

      <Button class="mt-4" onClick="updateCardContent" title="Update Card" />
    </View>
  </Window>
</Alloy>
```

**Controller (index.js)**:
```javascript
function updateCardContent() {
  // Update individual properties
  $.dynamicCard.updateTitle('Updated Welcome');
  $.dynamicCard.updateSubtitle('Updated Introduction');
  $.dynamicCard.updateText('This card has been updated dynamically.');
  $.dynamicCard.updateImage('/images/updated.jpg');
  
  // Or update multiple properties at once
  /*
  $.dynamicCard.update({
    title: 'Final Title',
    text: 'Final text content.',
    image: '/images/final.jpg'
  });
  */
}
```

These methods make it easy to modify the content of your components dynamically, providing greater flexibility and interactivity in your Titanium applications.


## Official Icon Fonts in PurgeTSS

To incorporate the free versions of Font Awesome, Material Icons, Material Symbols, or Framework7 Icons into your project, you can use the `icon-library` command in **PurgeTSS**:

```bash
> purgetss icon-library --vendor=fa,mi,ms,f7
```

Here's what each vendor abbreviation stands for:

- `fa` or `fontawesome` represents Font Awesome Icons.
- `mi` or `materialicons` stands for Material Icons.
- `ms` or `materialsymbol` corresponds to Material Symbols.
- `f7` or `framework7` is used for Framework7 Icons.

Running this command allows you to conveniently copy these icon font libraries into your project for use in your UI components.

## Custom Icon Font Libraries

TiKit components that use icons (like Buttons, Tabs, and Alerts) can work with any custom icon font library you add to your project. PurgeTSS makes it easy to integrate custom icon fonts that can then be used within your TiKit components.

### Adding Custom Icon Fonts

You can add any icon font library that has either a `.ttf` or `.otf` font file and a corresponding `.css` file with Unicode character definitions:

1. **Create the fonts directory structure** in your PurgeTSS folder:

   ```
   ./purgetss/fonts/
   purgetss
   └─ fonts
      └─ your-custom-icon-font
         ├─ icon-font.css
         └─ icon-font.ttf
   ```

2. **Build the font definitions** using PurgeTSS:

   ```bash
   > purgetss build-fonts
   ```
   
   This will generate all the fontFamily class definitions and Unicode characters in the `fonts.tss` file.

3. **Use your custom icons** in TiKit components:

   ```xml
   <!-- Example using a custom map-icons font -->
   <Button module="tikit.ui" variant="icon-left" size="base" 
           title="My Location" 
           icon="map-icons map-my-location text-xl" 
           classes="bg-blue-500 text-white" />
   
   <!-- Example using microns icon font -->
   <Alert module="tikit.ui" variant="pop" color="info"
          title="System Update" 
          text="Your system requires an update"
          icon="microns mi-sync text-2xl" />
   ```

### Example Custom Icon Libraries

Here's an example using two popular custom icon libraries:

```
./purgetss/fonts/
purgetss
└─ fonts
   └─ map-icons
      ├─ map-icons.css
      └─ map-icons.ttf
   └─ microns
      ├─ microns.css
      └─ microns.ttf
```

After running `purgetss build-fonts`, all icon classes will be available to use in your TiKit components, providing even more flexibility and customization options for your UI.

### Combining Icon Fonts

You can mix and match different icon font libraries in your TiKit components:

```xml
<View class="horizontal justify-evenly p-4">
  <Button module="tikit.ui" variant="icon-left" size="sm" title="Home" icon="fa fa-home" classes="bg-blue-500 text-white" />
  <Button module="tikit.ui" variant="icon-left" size="sm" title="Map" icon="map-icons map-my-location" classes="bg-green-500 text-white" />
  <Button module="tikit.ui" variant="icon-left" size="sm" title="Settings" icon="mi mi-settings" classes="bg-purple-500 text-white" />
</View>
```

This allows you to choose the perfect icon for each use case from any icon library you've added to your project.

## License

TiKit UI Components is open-source software licensed under the MIT License.

```
MIT License

Copyright (c) 2023-2025 César Estrada

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

For more information on using TiKit, please visit the [official documentation](https://purgetss.com/tikit).
