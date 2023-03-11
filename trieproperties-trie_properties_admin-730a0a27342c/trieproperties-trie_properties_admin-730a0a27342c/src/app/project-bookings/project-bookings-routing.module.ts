import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectBookingsComponent } from './project-bookings.component';

const routes: Routes = [
    { path: '', component: ProjectBookingsComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectBookingsRoutingModule {}
