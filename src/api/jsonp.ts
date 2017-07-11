import { Observable } from 'rxjs';

let id = 0;

export const JSONP =
  <T>(url: string): Observable<T> => {
    const promise = new Promise<T>((resolve, reject) => {
      const jsonpId = id++;
      const callbackId = `jsonp${jsonpId}`;
      const src = `${url}?format=json&jsonCallback=${callbackId}`;
      const script = Object.assign(document.createElement('script'), { id: jsonpId, src });

      window[callbackId] = (response: T) => {
        script.remove();
        resolve(response);
      };

      document.getElementsByTagName('head')[0].appendChild(script);
    });

    return Observable.from(promise);
  };
