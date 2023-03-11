import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSelectModule } from 'ng-zorro-antd/select';
@NgModule({
    declarations: [],
    imports: [CommonModule,

        NzCardModule,
        NzMessageModule,
        NzGridModule,
        NzFormModule,
        NzInputModule,
        NzTableModule,
        NzPaginationModule,
        NzButtonModule,
        NzIconModule,
        NzSwitchModule,
        NzPopconfirmModule,
        NzDropDownModule,
        NzModalModule,
        NzSelectModule,
        NzDrawerModule,
    ],
    exports: [

        NzCardModule,
        NzMessageModule,
        NzGridModule,
        NzFormModule,
        NzInputModule,
        NzTableModule,
        NzPaginationModule,
        NzButtonModule,
        NzIconModule,
        NzSwitchModule,
        NzPopconfirmModule,
        NzDropDownModule,
        NzModalModule,
        NzSelectModule,
        NzDrawerModule,

    ],
    providers: [],
})
export class BasicImportsModule { }