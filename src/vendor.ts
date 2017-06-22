import * as Rx from 'rxjs';
import { observeInConsole, writeToSelector } from './helpers';

/* Globalize helpers */
window['observeInConsole'] = observeInConsole;
window['writeToSelector'] = writeToSelector;

/* Globalize RxJS */
window['Rx'] = Rx;
Object.entries(Rx).map(([prop, value]) => window[prop] = value);
