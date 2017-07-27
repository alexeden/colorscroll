import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared';

import { AppComponent }  from './app.component';
import { HslScrollBlocksComponent, ScrollReaderDirective } from './scroll-block';
import { TheColorApiModule } from '../api';
import { LiveColorService, ColorDetailsService, ColorConverterService } from './services';
import { ColorScrollLayoutModule } from './layout';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    TheColorApiModule,
    ColorScrollLayoutModule
  ],
  providers: [
    LiveColorService,
    ColorDetailsService,
    ColorConverterService
  ],
  declarations: [
    AppComponent,
    HslScrollBlocksComponent,
    ScrollReaderDirective
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
