import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './Projects.component';
import { ProjectsRoutingModule } from './Projects-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicImportsModule } from '../basic-imports.module';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BasicImportsModule,
    NzUploadModule,
    NzTagModule
  ],
  declarations: [ProjectsComponent]
})
export class ProjectsModule { }
