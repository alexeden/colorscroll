export interface RGB {
  r: number;
  g: number;
  b: number;
}
export interface HSV {
  h: number;
  s: number;
  v: number;
}

export type HEX = string;

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface XYZ {
  x: number;
  y: number;
  z: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export const RGBtoHEX =
  ({r, g, b}: RGB): HEX => {
    const rHex = `00${r.toString(16)}`.slice(-2);
    const gHex = `00${g.toString(16)}`.slice(-2);
    const bHex = `00${b.toString(16)}`.slice(-2);
    return rHex + gHex + bHex;
  };

const hxcmToRgb =
  (H: number, X: number, C: number, M: number): RGB => {
    const toRgb =
      (red: number, green: number, blue: number): RGB => {
        const r = Math.round((red + M) * 255);
        const g = Math.round((green + M) * 255);
        const b = Math.round((blue + M) * 255);
        return { r, g, b };
      };

    if(H < 60) return toRgb(C, X, 0);
    else if(H < 120) return toRgb(X, C, 0);
    else if(H < 180) return toRgb(0, C, X);
    else if(H < 240) return toRgb(0, X, C);
    else if(H < 300) return toRgb(X, 0, C);
    else return toRgb(C, 0, X);
  };

export const HSLtoRGB =
  ({h, s, l}: HSL): RGB => {
    const S = s/100;
    const L = l/100;
    const C = (1 - Math.abs(2*L - 1)) * S;
    const X = C * (1 - Math.abs((h/60)%2 - 1));
    const m = L - C/2;
    return hxcmToRgb(h, X, C, m);
  };

export const HSVtoRGB =
  ({h, s, v}: HSV): RGB => {
    const S = s/100;
    const V = v / 100;
    const C = V * S;
    const X = C * (1 - Math.abs((h/60)%2 - 1));
    const m = V - C;
    return hxcmToRgb(h, X, C, m);
  };
