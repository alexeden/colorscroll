import { Injectable } from '@angular/core';
import * as convert from 'color-convert';
import { RGB, HSL } from '../../shared';

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

  hslToTuple({h, s, l}: HSL): Triplet {
    return [h, s, l];
  }

  rgbToTuple({r, g, b}: RGB): Triplet {
    return [r, g, b];
  }
}
