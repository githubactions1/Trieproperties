import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './Contact-us.component';
import { ContactUsRoutingModule } from './Contact-us-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    ReactiveFormsModule,
    NzMessageModule
  ],
  declarations: [ContactUsComponent]
})
export class ContactUsModule { }
