import { Observable } from 'rxjs';
import { Selectors, replaceContentAtSelector, htmlFromString, observeInConsole, writeToSelector } from '../shared';
import { TheColorApi } from '../api';
import { hexString$ } from '../features';

const widgetSelectors = {
  colorName: '.color-name'
};

const hex$ = hexString$.debounceTime(1000).share();

const colorName$
  = hex$
      .switchMap(hex =>
        Observable.concat(
          Observable.of('Getting color details'),
          TheColorApi.getColorScheme(hex).map(color => color)
        )
      );


colorName$
  .do(iconText => writeToSelector(widgetSelectors.colorName, iconText))
  .subscribe(observeInConsole('hsv'));

const colorDetailsElement = htmlFromString(`
  <h1 class="color-name"></h1>

`);

export const ColorFinderWidget = replaceContentAtSelector(Selectors.colorDetailsWidget, colorDetailsElement);
