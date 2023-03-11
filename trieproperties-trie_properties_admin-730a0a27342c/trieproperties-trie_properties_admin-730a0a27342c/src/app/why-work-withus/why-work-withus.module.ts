import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhyWorkWithusComponent } from './why-work-withus.component';
import { WhyWorkWithusRoutingModule } from './why-work-withus-routing.module';
import { BasicImportsModule } from '../basic-imports.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@NgModule({
  imports: [
    CommonModule,
    WhyWorkWithusRoutingModule,
    BasicImportsModule,
    ReactiveFormsModule,
    FormsModule,
    NzStatisticModule
  ],
  declarations: [WhyWorkWithusComponent]
})
export class WhyWorkWithusModule { }
