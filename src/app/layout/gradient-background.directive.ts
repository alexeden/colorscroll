import { Observable, Subject } from 'rxjs';
import { Directive, ElementRef, Renderer2, Input, OnInit, OnDestroy } from '@angular/core';
import { LiveColorService } from '../services';

@Directive({
  selector: '[colorScrollGradientBackground]'
})
export class ColorScrollGradientBackgroundDirective implements OnInit, OnDestroy {
  @Input('colorScrollGradientBackground') stops = 30;

  private gradient$: Observable<string>;
  private unsubscribe$ = new Subject<string>();

  constructor(
    private liveColorService: LiveColorService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.gradient$
      = this.liveColorService.hex$
          .debounceTime(5)
          .startWith('#ffffff')
          .scan((hexList, hex) => [hex, ...hexList].slice(0, this.stops), [])
          .filter(hexList => hexList.length > 0)
          .map(hexList =>
            // Set the position of the first (most recent) color so that it takes up the majority of the space
            hexList
              .map((hex, i) => i === 0 ? `${hex} 70%` : hex)
              .join(', ')
          )
          .map(gradientStops => `linear-gradient(180deg, ${gradientStops})`);
  }

  ngOnInit() {
    this.gradient$
      .takeUntil(this.unsubscribe$)
      .subscribe(gradient => {
        this.renderer.setStyle(this.elementRef.nativeElement, 'background', gradient);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next('trigger an unsubscribe');
    this.unsubscribe$.unsubscribe();
  }
}
