import { Subject } from 'rxjs';
import { Directive, ElementRef, Renderer2, Input, OnInit, OnDestroy } from '@angular/core';
import { LiveColorService } from '../services';

@Directive({
  selector: '[colorScrollGradientBackground]'
})
export class ColorScrollGradientBackgroundDirective implements OnInit, OnDestroy {
  @Input()
  set colorScrollGradientBackground(stops: number) {
    if (typeof stops === 'number') {
      this.stops = stops;
    }
  }

  private stops = 30;
  private unsubscribe$ = new Subject<string>();

  constructor(
    private liveColorService: LiveColorService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.liveColorService.hex$
      .takeUntil(this.unsubscribe$)
      .distinctUntilChanged()
      // Prefix each incoming hex value with a '#'
      .map(hex => `#${hex}`)
      .scan((hexList, hex) => [hex, ...hexList].slice(0, this.stops), [])
      // If there's only one color, dupe it so that the the gradient
      // has a start and end point
      .map(hexList =>
        hexList.length > 1
          ? hexList
          : [...hexList, ...hexList]
      )
      // Set the position of the first (most recent) color
      // so that it takes up the majority of the space
      .map(hexList =>
        hexList
          .map((hex, i) => i === 0 ? `${hex} 70%` : hex)
          .join(', ')
      )
      .map(gradientStops => `linear-gradient(180deg, ${gradientStops})`)
      .subscribe(gradient => {
        this.renderer.setStyle(this.elementRef.nativeElement, 'background', gradient);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next('trigger an unsubscribe');
    this.unsubscribe$.unsubscribe();
  }
}
