import { Observable } from 'rxjs';

/*
  This file exports 3 reactive variables:
  - changingHue1$: Observable<number>
  - changingHue2$: Observable<number>

  ---

  Notes:
  - Difference between .do and .map
  - Observables that never complete on their own (.fromEvent, .interval)
  - How to force completion
*/


// Icon hues
export const changingHue1$ = Observable.interval(23).map(i => i % 360);
export const changingHue2$ = Observable.interval(40).map(i => i % 360 * -1);
