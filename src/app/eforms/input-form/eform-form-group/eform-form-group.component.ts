import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CreateFormService } from '../../create-form/create-form.service';
import { inputsMinDim } from '../../../constants/eforms_const'


@Component({
  selector: 'app-eform-form-group',
  templateUrl: './eform-form-group.component.html',
  styleUrls: ['./eform-form-group.component.css'],
})
export class EformFormGroupComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() status: string;

  public inputsMinDim = inputsMinDim

  constructor(public serviceCreate: CreateFormService) { }

  ngOnInit(): void {}

  trackByFn(index) {
    return index;
  }

  get inputs(){
    return this.form.get('inputs') as FormArray;
  }

  selecInput(index){
    if(this.status=='create'){
      this.serviceCreate.selectInput(index)
    }
  }

  onDragEnd(event,input){
    
    // We dont need material to update the coords of the element
    // as we do that in patchValue (in the service)
    event.source._dragRef.reset();
    
    this.serviceCreate.updateCoords(event.distance, input)
  }




}
