import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CreateFormService } from '../../create-form/create-form.service';

@Component({
  selector: 'app-eform-input-field',
  templateUrl: './eform-input-field.component.html',
  styleUrls: ['./eform-input-field.component.css']
})
export class EformInputFieldComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() i: number ;
  @Input() input: AbstractControl ;
  

  constructor(private serviceCreate: CreateFormService) { }

  ngOnInit(): void {
  }

  selectInput(){
    this.serviceCreate.selectInput(this.i)
  }

  


}
