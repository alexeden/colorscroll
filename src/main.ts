import * as Rx from 'rxjs';
import { Observable } from 'rxjs';
import { Selectors, writeToSelector, observeInConsole } from './shared';
import { changingHue1$, changingHue2$, hue$, sat$, light$, hslString$, hexString$, gradient$ } from './features';
import { ColorFinderWidget } from './widgets';

/* Globalize helpers */
window['observeInConsole'] = observeInConsole;
window['writeToSelector'] = writeToSelector;

/* Globalize RxJS */
window['Rx'] = Rx;
Object.entries(Rx).map(([prop, value]) => window[prop] = value);


console.log(ColorFinderWidget);
/*
  - Overview of HSL


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

/* Create the color-changing icons */
// Icon DOM elements
const icon1 = document.querySelector(Selectors.icon1) as HTMLElement;
const icon2 = document.querySelector(Selectors.icon2) as HTMLElement;

// Icon DOM element clicks
const iconClicks1$ = Observable.fromEvent(icon1, 'click');
const iconClicks2$ = Observable.fromEvent(icon2, 'click');

// Activate the icons
changingHue1$.takeUntil(iconClicks1$).subscribe(hue => icon1.style.color = `hsl(${hue}, 100%, 50%)`);
changingHue2$.takeUntil(iconClicks2$).subscribe(hue => icon2.style.color = `hsl(${hue}, 100%, 50%)`);


hue$.subscribe(hue => writeToSelector(Selectors.hueValue, hue));
sat$.subscribe(sat => writeToSelector(Selectors.saturationValue, sat));
light$.subscribe(light => writeToSelector(Selectors.lightnessValue, light));

hslString$.subscribe(hslString => writeToSelector(Selectors.hslString, hslString));
gradient$.subscribe(gradient => document.body.style.background = gradient);

hexString$.subscribe(hexString => writeToSelector(Selectors.hexString, hexString));


/*
  Future features:
  - Holding the shift key decreases the scroll sensitivity for fine-tuned scrolling
  - Create a toggle button that changes the scroll control zones between HSL and RGB modes
  - Icon starts changing colors again after having previously been stopped
  - Double-clicking a value displays an input that allows you to enter a numeric value manually
  - Keyboard-only controls (tab key to switch control zones, arrow keys to change value)



*/
