import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './Blogs.component';
import { BlogsRoutingModule } from './Blogs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BlogsRoutingModule
  ],
  declarations: [BlogsComponent]
})
export class BlogsModule { }
