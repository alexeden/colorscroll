import { Observable } from 'rxjs';

/*
  This file exports 3 reactive variables:
  - hueScroll$: Observable<MouseWheelEvent>
  - satScroll$: Observable<MouseWheelEvent>
  - lightScroll$: Observable<MouseWheelEvent>
  ---
  Notes:
  - Using .filter as a control flow mechanism
  - Keeping code super DRY
  - Keeping manipulation of reactivity source state to a minimum
*/

/*
  Implementation 1 (good):
  Capture all .scroll-control and filter by target IDs
*/

// export const hueScroll$
//   = Observable.fromEvent(
//       document.querySelectorAll('#hue-control'),
//       'wheel',
//       (e: MouseWheelEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//         return e;
//       }
//     );
//
// export const satScroll$
//   = Observable.fromEvent(
//       document.querySelectorAll('#sat-control'),
//       'wheel',
//       (e: MouseWheelEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//         return e;
//       }
//     );
//
// export const lightScroll$
//   = Observable.fromEvent(
//       document.querySelectorAll('#light-control'),
//       'wheel',
//       (e: MouseWheelEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//         return e;
//       }
//     );

/*
  Implementation 2 (better):
  Capture all .scroll-control and filter by target IDs
*/
const colorControlScroll$
  = Observable.fromEvent(
      document.querySelectorAll('.scroll-control'),
      'wheel',
      (e: MouseWheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        return e;
      }
    );

export const hueScroll$ = colorControlScroll$.filter(e => e.toElement.id === 'hue-control');
export const satScroll$ = colorControlScroll$.filter(e => e.toElement.id === 'sat-control');
export const lightScroll$ = colorControlScroll$.filter(e => e.toElement.id === 'light-control');
