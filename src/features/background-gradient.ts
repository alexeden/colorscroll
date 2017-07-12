import { hexString$ } from './color-css-values';
const GradientStops = 30;

export const gradient$
  = hexString$
      .debounceTime(5)
      .startWith('#ffffff')
      .scan((hexList, hex) => [hex, ...hexList].slice(0, GradientStops), [])
      .filter(hexList => hexList.length > 0)
      .map(hexList =>
        // Set the position of the first (most recent) color so that it takes up the majority of the space
        hexList
          .map((hex, i) => i === 0 ? `${hex} 70%` : hex)
          .join(', ')
      )
      .map(gradientStops => `linear-gradient(180deg, ${gradientStops})`);
