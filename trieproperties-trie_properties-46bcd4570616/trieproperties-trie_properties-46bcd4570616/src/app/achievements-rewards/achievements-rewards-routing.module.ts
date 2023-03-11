import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AchievementsRewardsComponent } from './achievements-rewards.component';

const routes: Routes = [
    { path: '', component: AchievementsRewardsComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AchievementsRewardsRoutingModule {}
