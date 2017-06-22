import { Observable } from 'rxjs';
import { writeToSelector, observe } from './helpers';

const wheel$
  = Observable.fromEvent(
      document,
      'wheel',
      (e: MouseWheelEvent) => {
        e.preventDefault();
        return e;
      }
    );

const scrollDeltas$
  = wheel$
      .map(e => (
        {
          dx: e.deltaX || 0,
          dy: e.deltaY || 0,
          shiftKey: e.shiftKey
        }
      ));

const min = 0;
const max = 10000;

const x$
  = scrollDeltas$
      .map(delta => delta.dx)
      .filter(dx => dx !== 0)
      .scan(
        (x, dx) => {
          const x2 = x + dx;
          if(dx < min) {
      return x2 < min ? min : x2;
          }
          else {
      return x2 >= max ? max : x2;
          }
        },
        0
      )
      .distinctUntilChanged()
      .map(value => (value - min) / (max - min));

const y$
  = scrollDeltas$
      .filter(({shiftKey}) => shiftKey === false)
      .map(delta => delta.dy)
      .filter(dy => dy !== 0)
      .scan(
        (y, dy) => {
          const y2 = y + dy;
          if(dy < min) {
            return y2 < min ? min : y2;
          }
          else {
            return y2 >= max ? max : y2;
          }
        },
        (max - min) / 2
      )
      .distinctUntilChanged()
      .map(value => (value - min) / (max - min));

const y2$
  = scrollDeltas$
      .filter(({shiftKey}) => shiftKey === true)
      .map(delta => delta.dy)
      .filter(dy => dy !== 0)
      .scan(
        (y, dy) => {
          const y2 = y + dy;
          if(dy < min) {
      return y2 < min ? min : y2;
          }
          else {
      return y2 >= max ? max : y2;
          }
        },
        (max - min) / 2
      )
      .distinctUntilChanged()
      .map(value => (value - min) / (max - min));

const hue$ = x$.map(x => Math.round(360 * x)).do(writeToSelector('.hue-value'));
const sat$ = y$.map(y => Math.round(100 * y)).do(writeToSelector('.saturation-value'));
const light$ = y2$.map(y => Math.round(100 * y)).do(writeToSelector('.lightness-value'));

Observable.combineLatest(hue$, light$, sat$, (hue, light, sat) => ({ hue, light, sat }))
  .subscribe(({hue, light, sat}) =>
    document.body.style.backgroundColor = `hsl(${hue}, ${sat}%, ${light}%)`
  );

wheel$.subscribe(observe('wheel$'));
// wheelShift$.subscribe(console.log);
