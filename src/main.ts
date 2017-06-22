import { Observable } from 'rxjs';
import { writeToSelector, observeInConsole, Accumulators } from './helpers';
import { changingHue1$, changingHue2$, hue$, sat$, light$, hslString$ } from './features';

/*
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
const icon1 = document.querySelector('#color-scroll-icon-1') as HTMLElement;
const icon2 = document.querySelector('#color-scroll-icon-2') as HTMLElement;

// Icon DOM element clicks
const iconClicks1$ = Observable.fromEvent(icon1, 'click');
const iconClicks2$ = Observable.fromEvent(icon2, 'click');

// Activate the icons
changingHue1$.takeUntil(iconClicks1$).subscribe(hue => icon1.style.color = `hsl(${hue}, 100%, 50%)`);
changingHue2$.takeUntil(iconClicks2$).subscribe(hue => icon2.style.color = `hsl(${hue}, 100%, 50%)`);


hue$.subscribe(writeToSelector('.hue-value'));
sat$.subscribe(writeToSelector('.saturation-value'));
light$.subscribe(writeToSelector('.lightness-value'));

hslString$
  .do(writeToSelector('#hsl-string'))
  .subscribe(hsl => document.body.style.backgroundColor = hsl);
