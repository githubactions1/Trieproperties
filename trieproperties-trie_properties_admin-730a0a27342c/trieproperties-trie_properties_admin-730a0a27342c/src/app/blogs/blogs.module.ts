import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { BlogsRoutingModule } from './blogs-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicImportsModule } from '../basic-imports.module';


import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  imports: [
    CommonModule,
    BlogsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BasicImportsModule,
    NzUploadModule,
    NzDescriptionsModule,
    NzDatePickerModule
  ],
  declarations: [BlogsComponent]
})
export class BlogsModule { }
