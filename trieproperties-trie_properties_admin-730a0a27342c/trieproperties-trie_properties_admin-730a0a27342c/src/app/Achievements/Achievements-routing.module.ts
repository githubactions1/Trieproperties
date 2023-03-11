import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AchievementsComponent } from './Achievements.component';

const routes: Routes = [
    { path: '', component: AchievementsComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AchievementsRoutingModule {}
