import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OurProjectsComponent } from './Our-projects.component';


const routes: Routes = [
    { path: '', component: OurProjectsComponent }

];


@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OurProjectsRoutingModule {

}

