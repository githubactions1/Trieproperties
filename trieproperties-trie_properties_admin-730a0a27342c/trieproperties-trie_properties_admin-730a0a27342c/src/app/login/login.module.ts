import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutes,
    NzButtonModule,
    NzGridModule,
    NzLayoutModule,
    NzIconModule,
    NzInputModule,
    NzMessageModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSelectModule,
    FormsModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
