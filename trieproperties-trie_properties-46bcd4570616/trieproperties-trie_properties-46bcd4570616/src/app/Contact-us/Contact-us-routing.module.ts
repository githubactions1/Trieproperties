import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './Contact-us.component';

const routes: Routes = [
    { path: '', component: ContactUsComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactUsRoutingModule {}
