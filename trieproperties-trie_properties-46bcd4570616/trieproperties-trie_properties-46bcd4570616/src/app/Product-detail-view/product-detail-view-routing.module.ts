import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductDetailViewComponent } from './Product-detail-view.component';

const routes: Routes = [
    { path: '', component: ProductDetailViewComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductDetailViewRoutingModule {}
