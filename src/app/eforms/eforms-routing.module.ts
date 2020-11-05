import { RecordsListComponent } from './records-list/records-list.component';
import { CreateFormStepperComponent } from './create-form-stepper/create-form-stepper.component';
import { MainComponent } from './main/main.component';
import { FormsListComponent } from './forms-list/forms-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendFormStepperComponent } from './send-form/stepper/send-form-stepper.component';
import {RecordResolver} from '../shared/resolvers/record'

const routes: Routes = [
  {path: '', component: MainComponent, children: [
    {path: 'records', component: RecordsListComponent },
    {path: 'forms', component: FormsListComponent },
    {path: 'new-form', component: CreateFormStepperComponent },
    {path: 'update-form/:recordId', component: CreateFormStepperComponent, resolve:{record:RecordResolver} },
    {path: 'send-form/:recordId', component: SendFormStepperComponent , resolve:{record:RecordResolver} },
    {path: '/', redirectTo: 'records', pathMatch: 'exact' },
    {path: '**', redirectTo: 'records' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EFormsRoutingModule { }
