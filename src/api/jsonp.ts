import { Observable } from 'rxjs';

let id = 0;


export const JSONP =
  <T>(url: string, callbackParamKey = 'jsonCallback', queryParams: {[param: string]: string|number} = {}): Observable<T> => {
    const callbackId = `jsonp${id++}`;
    const callbackParam = `${callbackParamKey}=${callbackId}`;
    const queryParamString = Object.entries(queryParams).map(([k, v]) => `${k}=${v}`).join('&');
    const paramString = [queryParamString, callbackParam].join('&');
    const src = `${url}?${paramString}`;
    const script = Object.assign(document.createElement('script'), { src });

    const promise = new Promise<T>((resolve, reject) => {

      window[callbackId] = (response: T) => {
        script.remove();
        resolve(response);
      };

      document.getElementsByTagName('head')[0].appendChild(script);
    });

    return Observable.from(promise);
  };
