import * as Rx from 'rxjs';

/* Globalize RxJS */
window['Rx'] = Rx;
Object.entries(Rx).map(([prop, value]) => window[prop] = value);
