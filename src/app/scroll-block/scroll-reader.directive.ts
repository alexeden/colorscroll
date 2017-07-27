import { Observable, Subject } from 'rxjs';
import { Directive, ElementRef, Input, Output, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[scrollReader]'
})
export class ScrollReaderDirective implements OnInit, OnDestroy {

  @Input('scrollReader') axis: 'x'|'y' = 'x';
  @Input() throttle = 1;
  @Input() throttleWithShift = 100;
  @Output() scroll = new Subject<number>();

  private scrollEvents$: Observable<MouseWheelEvent>;
  private unsubscribe$ = new Subject<string>();

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
        const delta = this.axis === 'x' ? event.deltaX : event.deltaY;
        const normalDelta = delta < 0 ? -1 : 1;
        return Observable.of(normalDelta).delay(throttle);
      })
      .takeUntil(this.unsubscribe$)
      .subscribe(this.scroll);
  }

  ngOnDestroy() {
    this.unsubscribe$.next('trigger an unsubscribe');
    this.unsubscribe$.unsubscribe();
  }
}
