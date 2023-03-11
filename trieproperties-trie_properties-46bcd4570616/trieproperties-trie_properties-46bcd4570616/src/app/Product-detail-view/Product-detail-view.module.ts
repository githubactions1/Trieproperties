import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailViewComponent } from './Product-detail-view.component';
import { ProductDetailViewRoutingModule } from './product-detail-view-routing.module';
import {ReactiveFormsModule} from '@angular/forms'
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  imports: [
    CommonModule,
    ProductDetailViewRoutingModule,
    ReactiveFormsModule,
    NzMessageModule
  ],
  declarations: [ProductDetailViewComponent]
})
export class ProductDetailViewModule { }
