import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormsComponent } from './contact-forms.component';
import { ContactFormsRoutingModule } from './contact-forms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicImportsModule } from '../basic-imports.module';

@NgModule({
  imports: [
    CommonModule,
    ContactFormsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BasicImportsModule
  ],
  declarations: [ContactFormsComponent]
})
export class ContactFormsModule { }
