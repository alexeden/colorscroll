import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';

@NgModule({
  exports: [
    CommonModule,
    HttpModule,
    JsonpModule
  ]
})
export class SharedModule {}
