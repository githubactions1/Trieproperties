import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppVersionsComponent } from './app-versions.component';

const routes: Routes = [
    { path: '', component: AppVersionsComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppVersionsRoutingModule {}
