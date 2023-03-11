import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NavbarRoutes } from './navbar.routing';
import { FooterComponent } from './footer/footer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzSelectModule } from 'ng-zorro-antd/select'




@NgModule({
  imports: [
    CommonModule,
    NavbarRoutes,
    ReactiveFormsModule,
    NzMessageModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule


  ],
  declarations: [NavbarComponent, FooterComponent]
})
export class NavbarModule { }
