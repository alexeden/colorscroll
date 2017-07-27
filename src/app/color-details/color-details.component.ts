import { Component, OnInit } from '@angular/core';
import { ColorDetails } from '../../api';
import { Observable } from 'rxjs';
import { ColorDetailsService, LiveColorService } from '../services';

@Component({
  selector: 'color-details',
  template: `
    <div id="color-details-widget" class="ui segment attached center aligned secondary no-border">
      <h1 class="header">
        <img class="ui avatar image" src="{{colorImageSrc$ | async}}">
        <span>{{colorName$ | async}}</span>
      </h1>
    </div>
  `
})
export class ColorScrollColorDetailsComponent implements OnInit {
  colorDetails$: Observable<ColorDetails>;
  colorName$: Observable<string>;
  colorImageSrc$: Observable<string>;

  constructor(
    private liveColorService: LiveColorService,
    private colorDetailsService: ColorDetailsService
  ) {
    this.colorDetails$ =
      this.liveColorService.hex$
        .debounceTime(1000)
        .switchMap(hex => this.colorDetailsService.getColorDetailsByHex(hex));

    this.colorName$ = this.colorDetails$.map(details => details.name.value);
    this.colorImageSrc$ = this.colorDetails$.map(details => details.image.bare);
  }

  ngOnInit() {
    //
  }
}
