import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
// import { HSV, HSL, RGB, CMYK, XYZ } from 'colorscroll/shared';
// import { ColorDetails, ColorScheme, ColorSchemeMode } from './the-color-api.interfaces';
import * as TheColorApi from './the-color-api.interfaces';
import { Jsonp } from '@angular/http';

@Injectable()
export class TheColorApiService {
  constructor(
    private jsonp: Jsonp
  ) {}

  getColorByHex(hex: string): Observable<TheColorApi.ColorDetails> {
    const url = `http://www.thecolorapi.com/id`;
    return this.jsonp.request(url, {
      params: {
        format: 'json',
        hex: hex.replace('#', '')
      }
    })
    .map(response => response.json());
  }
  getColorScheme(hex: string, count = 5, scheme = TheColorApi.ColorSchemeMode.Monochrome): Observable<TheColorApi.ColorScheme> {
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
