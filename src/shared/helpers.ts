import { Observer } from 'rxjs/Observer';

const nextCss = `color: #fff; background-color: #2196F3;`;
const completeCss = `color: #333; background-color: #AEEA00; font-weight: bold;`;
const errorCss = `background-color: #ee0000; color: #ffffff; font-weight: bold;`;


export const observeInConsole
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
