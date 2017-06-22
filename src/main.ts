import { Observable } from 'rxjs';
import { writeToSelector, observe, Accumulators } from './helpers';

const ScrollSensitity = 0.001;
window['observe'] = observe;

const colorControlScroll$
  = Observable.fromEvent(
      document.querySelectorAll('.scroll-control'),
      'wheel',
      (e: MouseWheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        return e;
      }
    );

const hueScroll$ = colorControlScroll$.filter(e => e.toElement.id === 'hue-control');
const satScroll$ = colorControlScroll$.filter(e => e.toElement.id === 'sat-control');
const lightScroll$ = colorControlScroll$.filter(e => e.toElement.id === 'light-control');

const hue$
  = hueScroll$
      .map(e => e.deltaX)
      .filter(dx => dx !== 0)
      .startWith(0.45 / ScrollSensitity)
      .map(value => value * ScrollSensitity)
      .scan(Accumulators.Circular, 0)
      .map(ratio => Math.round(360 * ratio));

const sat$
  = satScroll$
      .map(e => e.deltaY)
      .filter(dy => dy !== 0)
      .startWith(0.8 / ScrollSensitity)
      .map(value => value * ScrollSensitity)
      .scan(Accumulators.Clamped, 0)
      .map(ratio => Math.round(100 * ratio));

const light$
  = lightScroll$
      .map(e => e.deltaY)
      .filter(dy => dy !== 0)
      .startWith(0.5 / ScrollSensitity)
      .map(value => value * ScrollSensitity)
      .scan(Accumulators.Clamped, 0)
      .map(ratio => Math.round(100 * ratio));

const hsl$
  = Observable.combineLatest(hue$, sat$, light$)
      .map(([hue, sat, light]) => `hsl(${hue}, ${sat}%, ${light}%)`);

hue$.subscribe(writeToSelector('.hue-value'));
sat$.subscribe(writeToSelector('.saturation-value'));
light$.subscribe(writeToSelector('.lightness-value'));

hsl$
  .do(writeToSelector('#hsl-string'))
  .subscribe(hsl => document.body.style.backgroundColor = hsl);

Observable.interval(25)
  .map(i => i % 360)
  .subscribe(hue => {
    const icon = document.querySelector('#color-scroll-icon-1') as HTMLElement;
    icon.style.color = `hsl(${hue}, 100%, 50%)`;
  });

Observable.interval(35)
  .map(i => i % 360 * -1)
  .subscribe(hue => {
    const icon = document.querySelector('#color-scroll-icon-2') as HTMLElement;
    icon.style.color = `hsl(${hue}, 100%, 50%)`;
  });
