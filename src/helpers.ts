import { Observer } from 'rxjs/Observer';

const nextCss = `color: #fff; background-color: #2196F3;`;
const completeCss = `color: #333; background-color: #AEEA00; font-weight: bold;`;
const errorCss = `background-color: #ee0000; color: #ffffff; font-weight: bold;`;


export const observe
  = (tag: string): Observer<any> =>
      ({
        next(value: any) {
          console.log(`%c${tag} next: `, nextCss, value);
        },
        error(err: any) {
          console.log(`%c${tag} error: `, errorCss, err);
        },
        complete() {
          console.log(`%c${tag} completed`, completeCss);
        }
      });

export const writeToSelector =
  (selector: string) =>
    <T>(content: T): T => {
      Array.from(document.querySelectorAll(selector))
        .forEach(elem =>
          Object.assign(elem, { innerText: content })
        );
      return content;
    };


export const Accumulators: Record<'Circular' | 'Clamped', (acc: number, value: number, i: number) => number> =
  {
    Circular(value, change) {
      const nextValue = value + change;
      return change < 0
        ? (nextValue < 0  ? (nextValue + 1) : nextValue)
        : (nextValue >= 1 ? (nextValue - 1) : nextValue);
    },
    Clamped(value, change) {
      const nextValue = value + change;
      return change < 0
        ? (nextValue <  0 ? 0 : nextValue)
        : (nextValue >= 1 ? 1 : nextValue);
    }
  };
