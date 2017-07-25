import { Observable, Subject } from 'rxjs';
import { Directive, ElementRef, Input, Output, OnInit, OnDestroy } from '@angular/core';

export enum ScrollAxis {
  X = 'x',
  Y = 'y'
}

export interface ScrollReaderEvent {
  axis: ScrollAxis;
  delta: number;
  shiftKey: boolean;
}


@Directive({
  selector: '[scrollReader]'
})
export class ScrollReaderDirective implements OnInit, OnDestroy {

  @Input('scrollReader') axis = ScrollAxis.Y;
  @Input() throttle = 1;
  @Input() throttleWithShift = 100;
  @Input() clampRange = 1;
  @Input() clampRangeWithShift = 1;
  @Output() scroll = new Subject<number>();

  private scrollEvents$: Observable<MouseWheelEvent>;
  private unsubscribe$ = new Subject<string>();

  static clamp(min: number, max: number, value: number): number {
    return Math.max(min, Math.min(value, max));
  }

  constructor(
    private elementRef: ElementRef
  ) {
    this.scrollEvents$ =
      Observable.fromEvent(this.elementRef.nativeElement, 'wheel', e => {
        e.preventDefault();
        e.stopPropagation();
        return e as MouseWheelEvent;
      });
  }

  ngOnInit() {
    this.scrollEvents$
      .exhaustMap(event => {
        const throttle = event.shiftKey ? this.throttleWithShift : this.throttle;
        const delta = this.axis === ScrollAxis.X ? event.deltaX : event.deltaY;
        const clamp = event.shiftKey ? this.clampRangeWithShift : this.clampRange;
        const clampedDelta = ScrollReaderDirective.clamp(-clamp, clamp, delta);
        return Observable.of(clampedDelta).delay(throttle);
      })
      .takeUntil(this.unsubscribe$)
      .subscribe(this.scroll);
  }

  ngOnDestroy() {
    this.unsubscribe$.next('trigger an unsubscribe');
    this.unsubscribe$.unsubscribe();
  }
}
