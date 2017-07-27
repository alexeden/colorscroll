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
      (scroll)="changeHueBy($event)"
      class="ui segment attached padded center aligned scroll-control">
      <i (click)="changeHueBy(-10)" tabindex="0" class="angle double left icon big"></i>
      <i (click)="changeHueBy(-1)" tabindex="0" class="angle left icon big"></i>
      <div class="ui statistic">
        <div class="value">{{hue$ | async}}&deg;</div>
        <div class="label center aligned">Hue</div>
      </div>
      <i (click)="changeHueBy(1)" tabindex="0" class="angle right icon big"></i>
      <i (click)="changeHueBy(10)" tabindex="0" class="angle double right icon big"></i>
    </div>

    <div class="ui segments horizontal no-border">
      <!--
        Saturation scroll zone
      -->
      <div
        scrollReader="y"
        (scroll)="changeSaturationBy($event)"
        [invert]="true"
        class="ui segment attached very padded center aligned scroll-control">
        <i (click)="changeSaturationBy(1)" tabindex="0" class="angle up icon big"></i>
        <i (click)="changeSaturationBy(10)" tabindex="0" class="angle double up icon big"></i>
        <br>
        <div class="ui statistic">
          <div class="value">{{saturation$ | async}}%</div>
          <div class="label">Saturation</div>
        </div>
        <br>
        <i (click)="changeSaturationBy(-1)" tabindex="0" class="angle down icon big"></i>
        <i (click)="changeSaturationBy(-10)" tabindex="0" class="angle double down icon big"></i>
      </div>

      <!--
        Lightness scroll zone
      -->
      <div
        class="ui segment attached very padded center aligned scroll-control"
        scrollReader="y"
        [invert]="true"
        (scroll)="changeLightnessBy($event)">
        <i (click)="changeLightnessBy(1)" tabindex="0" class="angle up icon big"></i>
        <i (click)="changeLightnessBy(10)" tabindex="0" class="angle double up icon big"></i>
        <br>
        <div class="ui statistic" (click)="changeLightnessBy(1)">
          <div class="value">{{lightness$ | async}}%</div>
          <div class="label">Lightness</div>
        </div>
        <br>
        <i (click)="changeLightnessBy(-1)" tabindex="0" class="angle down icon big"></i>
        <i (click)="changeLightnessBy(-10)" tabindex="0" class="angle double down icon big"></i>
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

  changeHueBy(delta: number) {
    this.colorService.applyHslUpdate(
      hsl => ({
        ...hsl,
        h: HslScrollBlocksComponent.circular(0, 360, hsl.h + delta)
      })
    );
  }
  changeSaturationBy(delta: number) {
    this.colorService.applyHslUpdate(
      hsl => ({
        ...hsl,
        s: HslScrollBlocksComponent.clamp(0, 100, hsl.s + delta)
      })
    );
  }
  changeLightnessBy(delta: number) {
    this.colorService.applyHslUpdate(
      hsl => ({
        ...hsl,
        l: HslScrollBlocksComponent.clamp(0, 100, hsl.l + delta)
      })
    );
  }

  private static circular(min: number, max: number, value: number): number {
    return value <= min
      ? value + max
      : value % max;
  }

  private static clamp(min: number, max: number, value: number): number {
    return Math.max(min, Math.min(value, max));
  }

}
