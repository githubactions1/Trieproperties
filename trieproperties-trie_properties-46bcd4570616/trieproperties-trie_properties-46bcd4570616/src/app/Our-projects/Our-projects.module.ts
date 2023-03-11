import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurProjectsComponent } from './Our-projects.component';
import { OurProjectsRoutingModule } from './Our-projects-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OurProjectsRoutingModule,
  ],
  declarations: [OurProjectsComponent]
})
export class OurProjectsModule { }
