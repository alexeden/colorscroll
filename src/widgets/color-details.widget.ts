import { Observable } from 'rxjs';
// import { htmlFromString } from '../shared';
// import * as TheColorApi from '../api';
// import { hexString$ } from '../features';

// const colorDetails$: Observable<Color> =
//   hexString$.debounceTime(1000)
//     .switchMap(hex => TheColorApi.getColor(hex))
//     .share();

// const hexMatchesNamedColor$ = colorDetails$.map(details => details.name.exact_match_name);

export const ColorDetailsWidget: Observable<string> = Observable.of('nope');
  // Observable.combineLatest(
  //   // colorDetails$,
  //   // hexMatchesNamedColor$
  // )
  // .map(([color, matches]) => `
  //   <div class="">
  //     <h1 class="header">
  //       <img class="ui avatar image" src="${color.image.bare}">
  //       <span>${color.name.value} ${!matches ? '' : '<span>(exact match!)</span>'}</span>
  //     </h1>
  //   </div>
  // `)
  // .map(htmlString => htmlFromString(htmlString));
