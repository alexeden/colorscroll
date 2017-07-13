import * as Rx from 'rxjs';
import { Observable } from 'rxjs';
import { Selectors, writeToSelector, observeInConsole, replaceContentAtSelector } from './shared';
import { changingHue1$, hue$, sat$, light$, hslString$, hexString$, gradient$ } from './features';
import { ColorDetailsWidget } from './widgets';

/* Globalize helpers */
window['observeInConsole'] = observeInConsole;
window['writeToSelector'] = writeToSelector;

/* Globalize RxJS */
window['Rx'] = Rx;
Object.entries(Rx).map(([prop, value]) => window[prop] = value);

/* Create the color-changing logo */
// Logo DOM element
const logo = document.querySelector(Selectors.logo) as HTMLElement;

// Logo clicks
const logoClick$ = Observable.fromEvent(logo, 'click');

// Activate the logo
changingHue1$.takeUntil(logoClick$).subscribe(hue => logo.style.color = `hsl(${hue}, 100%, 50%)`);

hue$.subscribe(hue => writeToSelector(Selectors.hueValue, hue));
sat$.subscribe(sat => writeToSelector(Selectors.saturationValue, sat));
light$.subscribe(light => writeToSelector(Selectors.lightnessValue, light));

hslString$.subscribe(hslString => writeToSelector(Selectors.hslString, hslString));
gradient$.subscribe(gradient => document.body.style.background = gradient);

hexString$.subscribe(hexString => writeToSelector(Selectors.hexString, hexString));

/*
  Add the color details widget to the page
*/
ColorDetailsWidget
  .subscribe(html => {
    replaceContentAtSelector(Selectors.colorDetailsWidget, html);
  });



/*
  Future features:
  - Holding the shift key decreases the scroll sensitivity for fine-tuned scrolling
  - Create a toggle button that changes the scroll control zones between HSL and RGB modes
  - Icon starts changing colors again after having previously been stopped
  - Double-clicking a value displays an input that allows you to enter a numeric value manually
  - Keyboard-only controls (tab key to switch control zones, arrow keys to change value)

  Overview of HSL


  Feature #1  Color-changing icons
  - Operators: Observable.interval, .map, .do
  - Helper introduction: writeToSelector

  ---

  Feature #2  Icons stop changing colors when clicked
  - Operators: .take, .takeUntil, .fromEvent
  - Helper: observeInConsole

  ---

  Notes:
  - DOM interactions happens only in the subscribe
  - Data coming through streams is used as-is; no manipulation
*/
