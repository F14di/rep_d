import { MainComponent } from './components/navigation/main/main.component';
import { MaterialModule } from './../material/material.module';
import { HoverDirective } from './directives/hover.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MainComponent, HoverDirective,],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [MainComponent, HoverDirective,]
})
export class SharedModule { }
