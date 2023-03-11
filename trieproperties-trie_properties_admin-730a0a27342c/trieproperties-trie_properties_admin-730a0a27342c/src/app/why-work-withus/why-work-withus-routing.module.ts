import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WhyWorkWithusComponent } from './why-work-withus.component';

const routes: Routes = [
    { path: '', component: WhyWorkWithusComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WhyWorkWithusRoutingModule {}
