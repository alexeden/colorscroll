import { Injectable } from '@angular/core';
import * as convert from 'color-convert';
import { RGB, HSL } from './color';

type Triplet = [number, number, number];

/*
  Export an empty class to be used as the provider DI token
*/
@Injectable()
export class ColorConverterService {
  rgb = convert.rgb;
  hex = convert.hex;
  hsl = convert.hsl;
  keyword = convert.keyword;

  hslToTriplet({h, s, l}: HSL): Triplet {
    return [h, s, l];
  }

  rgbToTriplet({r, g, b}: RGB): Triplet {
    return [r, g, b];
  }

  tripletToRgb([r, g, b]: Triplet): RGB {
    return {r, g, b};
  }

  tripletToHsl([h, s, l]: Triplet): HSL {
    return {h, s, l};
  }
}
