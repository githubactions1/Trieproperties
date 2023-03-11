import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppVersionsComponent } from './app-versions.component';
import { AppVersionsRoutingModule } from './app-versions-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@NgModule({
  imports: [
    CommonModule,
    AppVersionsRoutingModule,
    ReactiveFormsModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    NzModalModule,
    NzDatePickerModule,
    NzStatisticModule,
    NzAvatarModule,
  ],
  declarations: [AppVersionsComponent]
})
export class AppVersionsModule { }
