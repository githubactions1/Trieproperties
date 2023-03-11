import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchievementsRewardsComponent } from './achievements-rewards.component';
import { AchievementsRewardsRoutingModule } from './achievements-rewards-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AchievementsRewardsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [AchievementsRewardsComponent]
})
export class AchievementsRewardsModule { }
