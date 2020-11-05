import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordResolver } from '../shared/resolvers/record';
import { FillComponent } from './eforms/fill/fill.component';

const routes: Routes = [
  {path: 'eforms/fill/:recordId/:recipientId', component: FillComponent,  resolve:{pdf:RecordResolver} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

