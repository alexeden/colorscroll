export interface RGB {
  red: number;
  green: number;
  blue: number;
}
export interface HSV {
  hue: number;
  saturation: number;
  value: number;
}

export type HEX = string;

export interface HSL {
  hue: number;
  saturation: number;
  lightness: number;
}

export const RGBtoHEX =
  ({red, green, blue}: RGB): HEX => {
    const rHex = `00${red.toString(16)}`.slice(-2);
    const gHex = `00${green.toString(16)}`.slice(-2);
    const bHex = `00${blue.toString(16)}`.slice(-2);
    return rHex + gHex + bHex;
  };

const hxcmToRgb =
  (H: number, X: number, C: number, M: number): RGB => {
    const hRange = Math.ceil(H/10) % 6;
    console.log(`Hue: ${H}, range: ${hRange}`);
    const toRgb =
      (r: number, g: number, b: number): RGB => {
        const red = Math.round((r + M) * 255);
        const green = Math.round((g + M) * 255);
        const blue = Math.round((b + M) * 255);
        return { red, green, blue };
      };

    if(H < 60) return toRgb(C, X, 0);
    else if(H < 120) return toRgb(X, C, 0);
    else if(H < 180) return toRgb(0, C, X);
    else if(H < 240) return toRgb(0, X, C);
    else if(H < 300) return toRgb(X, 0, C);
    else return toRgb(C, 0, X);


    // switch (hRange) {
    //     case 0: return toRgb(C, X, 0);
    //     case 1: return toRgb(X, C, 0);
    //     case 2: return toRgb(0, C, X);
    //     case 3: return toRgb(0, X, C);
    //     case 4: return toRgb(X, 0, C);
    //     default: return toRgb(C, 0, X);
    // }
  };


export const HSLtoRGB =
  ({hue: H, saturation, lightness}: HSL): RGB => {
    const S = saturation/100;
    const L = lightness/100;
    const C = (1 - Math.abs(2*L - 1)) * S;
    const X = C * (1 - Math.abs((H/60)%2 - 1));
    const m = L - C/2;
    return hxcmToRgb(H, X, C, m);
  };

export const HSVtoRGB =
  ({hue: H, saturation, value}: HSV): RGB => {
    const S = saturation/100;
    const V = value / 100;
    const C = V * S;
    const X = C * (1 - Math.abs((H/60)%2 - 1));
    const m = V - C;
    return hxcmToRgb(H, X, C, m);
  };
