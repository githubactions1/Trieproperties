import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners.component';
import { BannersRoutingModule } from './banners-routing.module';

import { BasicImportsModule } from '../basic-imports.module';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [
    CommonModule,
    BannersRoutingModule,

    ReactiveFormsModule,
    FormsModule,

    BasicImportsModule,
    NzDescriptionsModule,
    NzUploadModule,
    NzIconModule,
    NzDropDownModule,
    NzSwitchModule,
    NzModalModule,
  ],
  declarations: [BannersComponent]
})
export class BannersModule { }
