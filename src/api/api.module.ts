import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from 'shared';

import { TheColorApiService } from './the-color-api.service';

@NgModule({
  imports: [
    HttpModule,
    SharedModule
  ],
  providers: [
    TheColorApiService
  ]
})
export class TheColorApiModule {}
