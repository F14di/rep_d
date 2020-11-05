import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateFormService } from '../../create-form/create-form.service';


@Component({
  selector: 'app-send-form-pdf',
  templateUrl: './send-form-pdf.component.html',
  styleUrls: ['./send-form-pdf.component.css']
})
export class SendFormPdfComponent implements OnInit {

@Input() formDetails;
@Input() status;
  
  constructor( public formService: CreateFormService) { }

  ngOnInit(): void {
    console.log(this)
  }

  
  reLocateReferencePoint(){
    this.formService.reLocateReferencePoint();
  }
  
  onPdfLoaded($event){
    this.formService.onPdfLoaded($event);
  }


}
