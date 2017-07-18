import { Observable } from 'rxjs';
import { HSV, HSL, RGB, CMYK, XYZ } from '../shared';
import { JSONP } from './jsonp';

export type ColorApiColor<T>
  = T & {
      fraction: T;
      value: string;
    };

export enum ColorSchemeMode {
  Monochrome = 'monochrome',
  MonochromeDark = 'monochrome-dark',
  MonochromeLight = 'monochrome-light',
  Analogic = 'analogic',
  Complement = 'complement',
  AnalogicComplement = 'analogic-complement',
  Triad = 'triad',
  Quad = 'quad'
}

export interface ColorImage {
  bare: string;
  named: string;
}

export interface Color {
  cmyk: ColorApiColor<CMYK>;
  hsl: ColorApiColor<HSL>;
  hsv: ColorApiColor<HSV>;
  rgb: ColorApiColor<RGB>;
  XYZ: ColorApiColor<XYZ>;
  hex: {
    value: string;
    clean: string;
  }
  name: {
    value: string;
    closest_named_hex: string;
    exact_match_name: boolean;
    distance: number;
  }
  image: ColorImage;
  contrast: {
    value: string;
  }
}

export interface ColorScheme {
  mode: ColorScheme;
  count: number;
  colors: Color[];
  seed: Color;
  image: ColorImage;
}

export const TheColorApi = {
  getColor: (hex: string): Observable<Color> => {
    const url = `http://www.thecolorapi.com/id`;
    return JSONP(url, 'callback', {
      format: 'json',
      hex: hex.replace('#', '')
    });
  },
  getColorScheme: (hex: string, count = 5, scheme = ColorSchemeMode.Monochrome): Observable<ColorScheme> => {
    const url = `http://www.thecolorapi.com/scheme`;
    return JSONP(url, 'callback', {
      format: 'json',
      hex: hex.replace('#', ''),
      mode: scheme,
      count
    });
  }
};
