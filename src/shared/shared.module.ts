import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';

import { ScrollReaderDirective } from './scroll-reader.directive';
import { ColorConverterService } from './color-converter.service';


@NgModule({
  exports: [
    CommonModule,
    HttpModule,
    JsonpModule,
    ScrollReaderDirective
  ],
  declarations: [
    ScrollReaderDirective
  ],
  providers: [
    ColorConverterService
  ]
})
export class SharedModule {}
export * from './color-converter.service';
export * from './scroll-reader.directive';
export * from './color';
export * from './helpers';
