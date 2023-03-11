import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AdminSectionComponent } from './admin-section.component';
import { AdminSectionRoutingModule } from './admin-section.routing';

@NgModule({
  imports: [
    CommonModule,
    AdminSectionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzCardModule,
    NzSwitchModule,
    NzTableModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzDropDownModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzModalModule,
  ],

  declarations: [AdminSectionComponent],
})
export class AdminSectionModule {}
