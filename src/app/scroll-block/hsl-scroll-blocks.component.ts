import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LiveColorService } from '../services';
// import { ScrollReaderEvent } from './scroll-reader.directive';

@Component({
  selector: 'hsl-scroll-blocks',
  template: `
    <!--
      Hue scroll zone
    -->
    <div
      scrollReader="x"
      (scroll)="hueScroll($event)"
      class="ui segment attached padded center aligned scroll-control"
      tabindex="0">
      <div class="ui statistic">
        <div class="value">
          <i class="swap horiz icon"></i>
          <!--
            Hue value
          -->
          <span class="hue-value">{{hue$ | async}}</span>&deg;
        </div>
        <div class="label center aligned">Hue</div>
      </div>
    </div>

    <div class="ui segments horizontal no-border">
      <!--
        Saturation scroll zone
      -->
      <div
        scrollReader="y"
        (scroll)="satScroll($event)"
        class="ui segment attached very padded center aligned scroll-control"
        tabindex="0">
        <div class="ui statistic">
          <div class="value">
            <i class="swap vert icon"></i>
            <!--
              Saturation value
            -->
            <span class="saturation-value">{{saturation$ | async}}</span>%
          </div>
          <div class="label">Saturation</div>
        </div>
      </div>

      <!--
        Lightness scroll zone
      -->
      <div
        class="ui segment attached very padded center aligned scroll-control"
        scrollReader="y"
        (scroll)="lightScroll($event)"
        tabindex="0">
        <div class="ui statistic">
          <div class="value">
            <i class="swap vert icon"></i>
            <!--
              Lightness value
            -->
            <span class="lightness-value">{{lightness$ | async}}</span>%
          </div>
          <div class="label">Lightness</div>
        </div>
      </div>
    </div>
  `
})
export class HslScrollBlocksComponent {
  hue$: Observable<number>;
  saturation$: Observable<number>;
  lightness$: Observable<number>;

  constructor(
    private colorService: LiveColorService
  ) {
    this.hue$ = this.colorService.hsl$.map(color => color.h);
    this.saturation$ = this.colorService.hsl$.map(color => color.s);
    this.lightness$ = this.colorService.hsl$.map(color => color.l);
  }

  hueScroll(delta: number) {
    this.colorService.apply(
      hsl => ({
        ...hsl,
        h: LiveColorService.circular(0, 360, hsl.h + delta)
      })
    );
  }
  satScroll(delta: number) {
    this.colorService.apply(
      hsl => ({
        ...hsl,
        s: LiveColorService.clamp(0, 100, hsl.s + delta)
      })
    );
  }
  lightScroll(delta: number) {
    this.colorService.apply(
      hsl => ({
        ...hsl,
        l: LiveColorService.clamp(0, 100, hsl.l + delta)
      })
    );
  }
}
