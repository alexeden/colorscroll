import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LiveColorService } from '../services';


@Component({
  selector: 'live-css',
  template: `
    <div class="ui segment attached bottom left aligned secondary no-border">
      <p>HSL</p>
      <code class="hsl-string">{{hslString$ | async}}</code>
      <p>RGB</p>
      <code class="hsl-string">{{rgbString$ | async}}</code>
      <p>Hex</p>
      <code class="hex-string">{{hexString$ | async}}</code>
    </div>
  `
})
export class ColorScrollLiveCssComponent {
  hslString$: Observable<string>;
  rgbString$: Observable<string>;
  hexString$: Observable<string>;

  constructor(
    private liveColorService: LiveColorService
  ) {
    this.hslString$ = this.liveColorService.hsl$.map(({h, s, l}) => `hsl(${h}, ${s}%, ${l}%)`);
    this.rgbString$ = this.liveColorService.rgb$.map(({r, g, b}) => `rgb(${r}, ${g}, ${b})`);
    this.hexString$ = this.liveColorService.hex$.map(hex => `#${hex}`);
  }
}
