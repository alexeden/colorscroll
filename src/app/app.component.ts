import { Component } from '@angular/core';

@Component({
  selector: 'colorscroll-app',
  template: `
  <div
    class="ui three column middle aligned centered grid"
    [colorScrollGradientBackground]="20">
    <div class="ui eight wide computer ten wide tablet twelve wide mobile column">
      <div class="ui segments raised scroll-controls-wrapper">
        <color-scroll-header></color-scroll-header>
        <hsl-scroll-blocks></hsl-scroll-blocks>
        <color-details></color-details>
        <live-css></live-css>
      </div>
    </div>
  </div>
  `
})
export class AppComponent {}
