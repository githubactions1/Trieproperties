import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTestimonialComponent } from './client-testimonial.component';
import { ClientTestimonialRoutingModule } from './client-testimonial-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicImportsModule } from '../basic-imports.module';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@NgModule({
  imports: [
    CommonModule,
    ClientTestimonialRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BasicImportsModule,
    NzStatisticModule,
    NzUploadModule
  ],
  declarations: [ClientTestimonialComponent]
})
export class ClientTestimonialModule { }
