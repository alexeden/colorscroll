import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { LiveColorService } from './live-color.service';


@Injectable()
export class ColorDetailsService {
  constructor(
    private liveColorService: LiveColorService
  ) {
    console.log(this.liveColorService);
  }
}
