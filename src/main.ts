import { Observable } from 'rxjs';
import { writeToSelector, observe } from './helpers';

window['observe'] = observe;

interface AccumulateValueOptions {
  min: number;
  max: number;
  circular: boolean;
  startWith: number;
  normalize: boolean;
}

type Accumulator = (acc: number, value: number, i: number) => number;

const accumulateValues
  = (valueSource$: Observable<number>, options: Partial<AccumulateValueOptions> = {}) => {
      const { min = 0, max = 100, circular = false, startWith = 0, normalize = true } = options;
      const range = max - min;
      const accumulator: Accumulator
        = circular
          ? (value, change) => {
              const nextValue = value + change;
              if(change < 0) {
                return nextValue < 0 ? (nextValue + range) : nextValue;
              }
              else {
                return nextValue >= max ? (nextValue - range) : nextValue;
              }
            }
          : (value, change) => {
              const nextValue = value + change;
              if(change < min) {
                return nextValue < min ? min : nextValue;
              }
              else {
                return nextValue >= max ? max : nextValue;
              }
            };


      return valueSource$
        .startWith(0)
        .scan(accumulator, startWith)
        .map(value =>
          normalize
            ? (value - min) / range
            : value
        );
    };

const colorControlScroll$
  = Observable.fromEvent(
      document.querySelectorAll('.scroll-control'),
      'wheel',
      (e: MouseWheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        return e;
      }
    );

const hueScroll$
  = colorControlScroll$
      .filter(e => e.toElement.id === 'hue-control')
      .map(e => e.deltaX)
      .filter(dx => dx !== 0);

const satWheel$
  = colorControlScroll$
      .filter(e => e.toElement.id === 'sat-control')
      .map(e => e.deltaY)
      .filter(dy => dy !== 0);


const lightWheel$
  = colorControlScroll$
      .filter(e => e.toElement.id === 'light-control')
      .map(e => e.deltaY)
      .filter(dy => dy !== 0);


const hue$
  = accumulateValues(hueScroll$, {
      circular: true,
      startWith: 2100,
      max: 5000
    })
    .map(x => Math.round(360 * x));

const sat$
  = accumulateValues(satWheel$, {
      startWith: 4000,
      max: 5000
    })
    .map(y => Math.round(100 * y));

const light$
  = accumulateValues(lightWheel$.filter(dy => dy !== 0), {
      startWith: 2500,
      max: 5000
    })
    .map(y => Math.round(100 * y))
    .do(writeToSelector('.lightness-value'));

const hsl$
  = Observable.combineLatest(hue$, sat$, light$)
      .map(([hue, sat, light]) => `hsl(${hue}, ${sat}%, ${light}%)`);

hue$.subscribe(writeToSelector('.hue-value'));
sat$.subscribe(writeToSelector('.saturation-value'));

hsl$
  .do(writeToSelector('#hsl-string'))
  .subscribe(hsl => document.body.style.backgroundColor = hsl);



Observable.interval(25)
  .map(i => i % 360)
  .subscribe(hue => {
    const icon = document.querySelector('#color-scroll-icon-1') as HTMLElement;
    icon.style.color = `hsl(${hue}, 100%, 50%)`;
  });

Observable.interval(35)
  .map(i => i % 360 * -1)
  .subscribe(hue => {
    const icon = document.querySelector('#color-scroll-icon-2') as HTMLElement;
    icon.style.color = `hsl(${hue}, 100%, 50%)`;
  });
