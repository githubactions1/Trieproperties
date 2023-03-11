import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactFormsComponent } from './contact-forms.component';

const routes: Routes = [
    { path: '', component: ContactFormsComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactFormsRoutingModule {}
