import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { FillComponent } from './eforms/fill/fill.component';
import { EFormsModule } from '../eforms/eforms.module';
import { MaterialModule } from '../material/material.module';

import { SignaturePadModule } from 'angular2-signaturepad';


@NgModule({
  declarations: [FillComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    EFormsModule,
    MaterialModule,
    SignaturePadModule
  ]
})
export class PublicModule { }
