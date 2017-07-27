import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ColorScrollIconComponent } from './color-scroll-icon.component';
import { ColorScrollHeaderComponent } from './header.component';
import { ColorScrollGradientBackgroundDirective } from './gradient-background.directive';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ColorScrollIconComponent,
    ColorScrollHeaderComponent,
    ColorScrollGradientBackgroundDirective
  ],
  exports: [
    ColorScrollIconComponent,
    ColorScrollHeaderComponent,
    ColorScrollGradientBackgroundDirective
  ]
})
export class ColorScrollLayoutModule {}
