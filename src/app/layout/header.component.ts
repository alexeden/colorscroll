import { Component } from '@angular/core';


@Component({
  selector: 'color-scroll-header',
  template: `
    <h1 class="ui top attached huge header center aligned no-border secondary">
      <color-scroll-icon></color-scroll-icon>
      <div id="color-scroll-icon-text" class="content">ColorScroll</div>
    </h1>
  `
})
export class ColorScrollHeaderComponent {}
