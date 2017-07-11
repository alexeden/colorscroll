import { Accumulators } from '../shared/helpers';
import { hueScroll$, satScroll$, lightScroll$ } from './color-control-scrolls';

/*
  This file exports 3 reactive variables:
  - hue$: Observable<number>
  - sat$: Observable<number>
  - light$: Observable<number>

  ---

  Notes:
  - Operators: .startWith, .scan, .fromEvent
  - Helper: Accumulators
  - Using .filter to limit high-frequency emissions
*/

const ScrollSensitity = 0.001;

export const hue$
  = hueScroll$
      .map(e => e.deltaX)
      .filter(dx => dx !== 0)
      .startWith(0.45 / ScrollSensitity)
      .map(value => value * ScrollSensitity)
      .scan(Accumulators.Circular, 0)
      .map(ratio => Math.round(360 * ratio));

export const sat$
  = satScroll$
      .map(e => e.deltaY)
      .filter(dy => dy !== 0)
      .startWith(0.8 / ScrollSensitity)
      .map(value => value * ScrollSensitity)
      .scan(Accumulators.Clamped, 0)
      .map(ratio => Math.round(100 * ratio));

export const light$
  = lightScroll$
      .map(e => e.deltaY)
      .filter(dy => dy !== 0)
      .startWith(0.5 / ScrollSensitity)
      .map(value => value * ScrollSensitity)
      .scan(Accumulators.Clamped, 0)
      .map(ratio => Math.round(100 * ratio));
