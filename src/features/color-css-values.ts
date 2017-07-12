import { Observable } from 'rxjs';
import { HSLtoRGB, RGBtoHEX, HSL } from '../shared';
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

export const hexString$
    = Observable.combineLatest(
        hue$, sat$, light$,
        (h, s, l): HSL => ({ h, s, l })
      )
      .map(HSLtoRGB)
      .map(RGBtoHEX)
      .map(hex => `#${hex}`.toUpperCase());
