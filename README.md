# Getting started

You know the drill:

- $ `git clone https://github.com/alexeden/colorscroll colorscroll`
- $ `cd colorscroll`
- $ `npm install`
- $ `npm start`
- Open `http://localhost:4000/` in your browser

# Meet your UI

All of the HTML is provided for you. It's your job to bring it to life.

![Clean slate](https://github.com/alexeden/colorscroll/blob/master/docs/color-scroll-off.png)

# Get to know your DOM

There are 3 zones that should listen for scroll events. They have the class `.scroll-control`.

![.scroll-control](https://github.com/alexeden/colorscroll/blob/master/docs/scroll-controls.png)

The 3 scroll zones also have a unique DOM id.

![scroll-control-ids](https://github.com/alexeden/colorscroll/blob/master/docs/scroll-control-ids.png)

The app has 2 "logo" icons that change colors while the app is running; because why not. They have the DOM ids `#color-scroll-icon-1` and `#color-scroll-icon-2`.

Some classes mark an element as a target for having its content filled-in with a specific value:
- `.hue-value` Element's content will be overwritten with the current hue value
- `.saturation-value` Element's content will be overwritten with the current saturation value
- `.lightness-value` Element's content will be overwritten with the current lightness value
- `.hsl-string` Element's content will be overwritten with a valid `hsl` CSS color value

![value-elements](https://github.com/alexeden/colorscroll/blob/master/docs/value-elements.png)

# What we're aiming for

When the app is done, it will look something like this:

![final-ui](https://github.com/alexeden/colorscroll/blob/master/docs/color-scroll-on.png)

In action, it'll look something like this:

![in-action](https://github.com/alexeden/colorscroll/blob/master/docs/color-scroll.gif)
