import { Component } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'color-scroll-icon',
  template: `
    <i class="color lens icon"></i>
  `
})
export class ColorScrollIconComponent {
  private changingHue$: Observable<number>;
  iconHsl$: Observable<string>;

  constructor() {
    this.changingHue$ = Observable.interval(23).map(i => i % 360);
  }
}
