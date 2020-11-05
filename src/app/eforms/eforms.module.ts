import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EFormsRoutingModule } from './eforms-routing.module';
import { FormsListComponent } from './forms-list/forms-list.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../auth/jwt-interceptor';
import { CreateFormStepperComponent } from './create-form-stepper/create-form-stepper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecordsListComponent } from './records-list/records-list.component';
import { CreateFormComponent } from './create-form/create-form.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EformFormGroupComponent } from './input-form/eform-form-group/eform-form-group.component';
import { EformInputFieldComponent } from './input-form/eform-input-field/eform-input-field.component';
import { FakeBackendInterceptor } from '../auth/fake-backend';
import { SendFormStepperComponent } from './send-form/stepper/send-form-stepper.component';
import { SendFormPdfComponent } from './send-form/send-form-pdf/send-form-pdf.component';
import { ResizeArrowsComponent } from './input-form/resize-arrows/resize-arrows.component';

@NgModule({
  declarations: [
    FormsListComponent,
    MainComponent,
    CreateFormStepperComponent,
    RecordsListComponent,
    CreateFormComponent,
    EformFormGroupComponent,
    EformInputFieldComponent,
    SendFormStepperComponent,
    SendFormPdfComponent,
    ResizeArrowsComponent
  ],
  imports: [
    CommonModule,
    EFormsRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    SharedModule
  ],
  exports:[ SendFormPdfComponent ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
  ]
})
export class EFormsModule { }
