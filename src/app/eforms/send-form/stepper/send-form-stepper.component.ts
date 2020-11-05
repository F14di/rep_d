import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateFormService } from '../../create-form/create-form.service';
import {API_DOMAIN} from '../../../constants/app_const';
import {FORM_STATUS} from '../../../constants/eforms_const'
import { FormsService } from '../../forms.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-send-form-stepper',
  templateUrl: './send-form-stepper.component.html',
  styleUrls: ['./send-form-stepper.component.css'],
})
export class SendFormStepperComponent implements OnInit {

  FORM_STATUS = FORM_STATUS
  
  
  formDetails: FormGroup
  formResolved: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    public formService: CreateFormService, private service: FormsService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.data.pipe(map(res=>res.record.data)).subscribe(res=>{
      this.formResolved = res
      this.setPDFAsBackground(res.upload._id);
      this.patchForm(res)
    })
  }

  patchForm(form) {
    this.formDetails = this.fb.group({
      recipients:this.fb.array(form.recipient_templates.map(rec=>this.fb.group({name:'פאדי',template_number:rec.number,contact_method:'email',contact_value:'ffadi14@gmail.com',external_id:'',...rec}))),
      inputs:this.formService.inputsToFormArray(form.inputs),
    })
  }

  print(){
    console.log(this.formDetails.value)
  }

  setPDFAsBackground(upload_id){
    this.formService.pdfSource = `${API_DOMAIN}eforms/uploads/${upload_id}/pdf`;

  }

  get recipients(){
    return this.formDetails.get('recipients') as FormArray;
  }

  get inputs(){
    return this.formDetails.get('inputs') as FormArray;
  }

  submit(){
    const form = this.formService.getFormValue(this.formDetails.value)
    this.service.sendFormForFilling(form, this.formResolved._id)
      .subscribe((http_res: {data:{},success:string})=>{
        if(http_res.success=='true'){
          this.router.navigateByUrl('/eforms/records')
        }
      })
  }
}
