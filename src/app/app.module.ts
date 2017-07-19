import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'shared';

import { AppComponent }  from './app.component';
import { ScrollBlockComponent, ScrollReaderDirective } from './scroll-block';
import { TheColorApiService } from './services';


@NgModule({
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [
    TheColorApiService
  ],
  declarations: [
    AppComponent,
    ScrollBlockComponent,
    ScrollReaderDirective
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(
    public theColorApi: TheColorApiService
  ) {}
}
