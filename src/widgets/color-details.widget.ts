import { Observable } from 'rxjs';
import { Selectors, replaceContentAtSelector, htmlFromString/*, observeInConsole*/ } from '../shared';
import { TheColorApi, Color } from '../api';
import { hexString$ } from '../features';
//
// const widgetSelectors = {
//   colorName: '.color-name'
// };

const hex$ = hexString$.debounceTime(1000).share();

// enum Status {
//   Loading
// }
//
// interface ColorDetails {
//   status: Status;
// }

const colorDetails$: Observable<Color>
  = hex$
      .switchMap(hex =>
        TheColorApi.getColor(hex)
        // Observable.concat(
        //   // Observable.of('Getting color details'),
        // )
      );


colorDetails$
  .map(color => `
    <div class="ui relaxed">
        <img class="ui avatar image" src="${color.image.bare}">
        <span class="content">
          <h1 class="header">${color.name.value}</h1>
          <div class="description">Updated 10 mins ago</div>
        </span>
    </div>
  `)
  .map(htmlString => htmlFromString(htmlString))
  .subscribe(html => {
    replaceContentAtSelector(Selectors.colorDetailsWidget, html);
  });

const colorDetailsElement = htmlFromString(`
  <h1>hi</h1>
`);

export const ColorFinderWidget = replaceContentAtSelector(Selectors.colorDetailsWidget, colorDetailsElement);
