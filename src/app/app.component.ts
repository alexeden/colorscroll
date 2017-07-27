import { Component, Renderer2, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LiveColorService } from './services';

@Component({
  selector: 'colorscroll-app',
  template: `
  <div class="ui three column middle aligned centered grid">
    <div class="ui eight wide computer ten wide tablet twelve wide mobile column">
      <div class="ui segments raised scroll-controls-wrapper">

        <h1 class="ui top attached huge header center aligned no-border secondary">
          <i id="color-scroll-icon-1" class="color lens icon"></i>
          <div id="color-scroll-icon-text" class="content">ColorScroll</div>
        </h1>

        <hsl-scroll-blocks></hsl-scroll-blocks>

        <div id="color-details-widget" class="ui segment attached bottom center aligned secondary no-border">
        </div>

        <div class="ui segment attached bottom center aligned secondary no-border">
          <!-- HSL string value -->
          <code class="hsl-string">{{hslString$ | async}}</code>
          <code class="hex-string">#??????</code>
        </div>
      </div>
    </div>
  </div>
  `
})
export class AppComponent implements OnInit {

  hslString$: Observable<string>;

  constructor(
    private colorService: LiveColorService,
    private renderer: Renderer2
  ) {
    this.hslString$ = this.colorService.hslString$;
  }

  ngOnInit() {
    this.hslString$
      .subscribe(hsl => {
        this.renderer.setStyle(window.document.body, 'background-color', hsl);
      });
  }

}
