import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectBookingsComponent } from './project-bookings.component';
import { ProjectBookingsRoutingModule } from './project-bookings-routing.module';
import { BasicImportsModule } from '../basic-imports.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectBookingsRoutingModule,
    BasicImportsModule
  ],
  declarations: [ProjectBookingsComponent]
})
export class ProjectBookingsModule { }
