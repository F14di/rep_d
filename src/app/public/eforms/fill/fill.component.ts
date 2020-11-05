import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateFormService } from 'src/app/eforms/create-form/create-form.service';
import {API_DOMAIN} from '../../../constants/app_const'
import {FORM_STATUS} from '../../../constants/eforms_const'

import { SignaturePad } from 'angular2-signaturepad';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html',
  styleUrls: ['./fill.component.css'],
  providers:[CreateFormService]

})
export class FillComponent implements OnInit {
  formResolved: any;
  formDetails:FormGroup

  FORM_STATUS = FORM_STATUS;

  constructor( private route: ActivatedRoute, private formService: CreateFormService, private fb: FormBuilder ) { }

  ngOnInit(): void {      
    this.route.data.pipe(map(res=>res.record.data)).subscribe(res=>{
      this.formResolved = res
      this.formService.pdfSource = `${API_DOMAIN}eforms/uploads/${res.pdf.upload_id}/pdf`;
    })




    this.formDetails = this.fb.group({
      recipients:this.fb.array(this.formResolved.recipient_templates.map(rec=>this.fb.group({name:'פאדי',template_number:rec.number,contact_method:'email',contact_value:'ffadi14@gmail.com',external_id:'',...rec}))),
      inputs:this.formService.inputsToFormArray(this.formResolved.inputs),
    })

    console.log(this)
  }

  printer(){
    console.log(this.formDetails)
    console.log(this.formService.getFormValue(this.formDetails.value))
  }




  @ViewChild(SignaturePad) signaturePad: SignaturePad;
 
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };
 
 
  ngAfterViewInit() {
    console.log(this.signaturePad)
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
 
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL());
    // console.log(this.signaturePad);


    console.log(this.signaturePad.toDataURL()); // save image as PNG
    console.log(this.signaturePad.toDataURL("image/jpeg")); // save image as JPEG
    console.log(this.signaturePad.toDataURL("image/svg+xml")); // save image as SVG
  }
 
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  
}
