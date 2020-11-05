import { SharedModule } from './shared/shared.module';
import { getHebrewPaginatorIntl } from './mat-paginator-intl-translate';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';

import { MatPaginatorIntl } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    HomeModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getHebrewPaginatorIntl() },
    // {provide: HTTP_INTERCEPTORS,useClass: HttpErrorInterceptor,multi: true},
    // { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },

],
  bootstrap: [AppComponent]
})
export class AppModule { }
