import { Observer } from 'rxjs/Observer';

const nextCss = `color: #fff; background-color: #2196F3;`;
const completeCss = `color: #333; background-color: #AEEA00; font-weight: bold;`;
const errorCss = `background-color: #ee0000; color: #ffffff; font-weight: bold;`;


export const observe
  = <T>(tag: string): Observer<T> => ({
      // next: next(tag),
      next(value: T) {
        console.log(`%c${tag} next: `, nextCss, value);
      },
      error(err: any) {
        console.log(`%c${tag} error: `, errorCss, err);
      },
      complete() {
        console.log(`%c${tag} completed`, completeCss);
      }
    });

export const pick =
  <T>(...keys: (keyof T)[]) =>
    (obj: T) =>
      keys
        .filter(k => !!obj[k])
        .reduce((accum, k) => ({ ...accum, [k]: obj[k] }), {});

export const writeToSelector =
  (selector: string) =>
    <T>(content: T): T => {
      Array.from(document.querySelectorAll(selector))
        .map(elem =>
          Object.assign(elem, { innerText: content })
        );
      return content;
    };
