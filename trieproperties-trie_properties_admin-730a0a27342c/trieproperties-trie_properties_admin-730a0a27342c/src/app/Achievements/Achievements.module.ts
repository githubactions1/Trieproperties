import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchievementsComponent } from './Achievements.component';
import { AchievementsRoutingModule } from './Achievements-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicImportsModule } from '../basic-imports.module';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@NgModule({
  imports: [
    CommonModule,
    AchievementsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BasicImportsModule,
    NzUploadModule
  ],
  declarations: [AchievementsComponent]
})
export class AchievementsModule { }
