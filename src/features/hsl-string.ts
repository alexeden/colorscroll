import { Observable } from 'rxjs';
import { hue$, sat$, light$ } from './hsl-values';

/*
  This file exports 1 reactive variables:
  - hslString$: Observable<string>
  ---
  Notes:
  - Operators: .combineLatest
*/

export const hslString$
  = Observable.combineLatest(hue$, sat$, light$)
      .map(([hue, sat, light]) => `hsl(${hue}, ${sat}%, ${light}%)`);
