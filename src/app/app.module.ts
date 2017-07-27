import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared';

import { AppComponent }  from './app.component';
import { HslScrollBlocksComponent } from './scroll-block';
import { TheColorApiModule } from '../api';
import { LiveColorService, ColorDetailsService } from './services';
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
    ColorDetailsService
  ],
  declarations: [
    AppComponent,
    HslScrollBlocksComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
