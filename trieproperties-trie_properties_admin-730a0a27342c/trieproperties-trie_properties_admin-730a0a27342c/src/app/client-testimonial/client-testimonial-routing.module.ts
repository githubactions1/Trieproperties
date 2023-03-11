import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientTestimonialComponent } from './client-testimonial.component';

const routes: Routes = [
    { path: '', component: ClientTestimonialComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientTestimonialRoutingModule {}
