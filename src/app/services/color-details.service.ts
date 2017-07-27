import { Injectable } from '@angular/core';
import { Observable, ConnectableObservable, Subject } from 'rxjs';
import { TheColorApiService, ColorDetails } from '../../api';

@Injectable()
export class ColorDetailsService {

  private colorDetailsResponse = new Subject<ColorDetails>();
  colorDetailsHistory$: ConnectableObservable<ColorDetails>;

  constructor(
    private theColorApi: TheColorApiService
  ) {
    this.colorDetailsHistory$ = this.colorDetailsResponse.publishReplay();
  }

  getColorDetailsByHex(hex: string): Observable<ColorDetails> {
    return this.theColorApi.getColorByHex(hex)
      .do(response => this.colorDetailsResponse.next(response));
  }
}
