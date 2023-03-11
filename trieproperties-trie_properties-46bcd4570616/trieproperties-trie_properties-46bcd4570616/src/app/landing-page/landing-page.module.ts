import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutes } from './landing-page.routing';
import {ReactiveFormsModule} from '@angular/forms'
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

@NgModule({
  imports: [
    CommonModule,
    LandingPageRoutes,
    ReactiveFormsModule,
    NzMessageModule,
    NzGridModule,
    NzCarouselModule

  ],
  declarations: [LandingPageComponent]
})
export class LandingPageModule { }
