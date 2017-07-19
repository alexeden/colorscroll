import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
// import { HSV, HSL, RGB, CMYK, XYZ } from 'colorscroll/shared';
import { Color, ColorScheme, ColorSchemeMode } from './the-color-api.interfaces';

import { Jsonp } from '@angular/http';

@Injectable()
export class TheColorApiService {
  constructor(
    private jsonp: Jsonp
  ) {}

  getColor(hex: string): Observable<Color> {
    const url = `http://www.thecolorapi.com/id`;
    return this.jsonp.request(url, {
      params: {
        format: 'json',
        hex: hex.replace('#', '')
      }
    })
    .map(response => response.json());
  }
  getColorScheme(hex: string, count = 5, scheme = ColorSchemeMode.Monochrome): Observable<ColorScheme> {
    const url = `http://www.thecolorapi.com/scheme`;
    return this.jsonp.request(url, {
      params: {
        format: 'json',
        hex: hex.replace('#', ''),
        mode: scheme,
        count
      }
    })
    .map(response => response.json());
  }
}
