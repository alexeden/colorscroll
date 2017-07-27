import { Injectable } from '@angular/core';
import { Subject, ConnectableObservable, Observable } from 'rxjs';
import { HSL } from '../../shared';
import { TheColorApiService } from '../../api';

export type HslOperation = (color: HSL) => HSL;

@Injectable()
export class LiveColorService {
  hsl$: ConnectableObservable<HSL>;
  hslString$: Observable<string>;

  private readonly hslUpdates$ = new Subject<HslOperation>();

  static circular(min: number, max: number, value: number): number {
    return value <= min
      ? value + max
      : value % max;
  }

  static clamp(min: number, max: number, value: number): number {
    return Math.max(min, Math.min(value, max));
  }

  constructor(
    public colorApi: TheColorApiService
  ) {
    this.hsl$
      = this.hslUpdates$
          .startWith((hsl: HSL) => hsl)
          .scan(
            (hsl, operation) => operation(hsl),
            { h: 170, l: 50, s: 100 }
          )
          .publishReplay(1);

    this.hslString$ = this.hsl$.map(({h, s, l}) => `hsl(${h}, ${s}%, ${l}%)`);

    this.hsl$.connect();
  }

  apply(operation: HslOperation) {
    this.hslUpdates$.next(operation);
  }




}
