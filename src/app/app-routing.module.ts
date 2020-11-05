import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path: 'login',   loadChildren: () => import('./login/login.module')  .then(m => m.LoginModule)},
    {path: 'public',  loadChildren: () => import('./public/public.module').then(m => m.PublicModule)},
    {path: 'home',    loadChildren: () => import('./home/home.module')    .then(m => m.HomeModule),     canActivate: [AuthGuard]},
    {path: 'eforms',  loadChildren: () => import('./eforms/eforms.module').then(m => m.EFormsModule),   canActivate: [AuthGuard]},
    
    {path: '**',redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
