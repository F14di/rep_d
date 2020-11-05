import { HttpEvent, HttpEventType } from '@angular/common/http';
import { CreateFormService } from '../create-form/create-form.service';
import { FormsService } from '../forms.service';
import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import {API_DOMAIN} from '../../constants/app_const';

@Component({
  selector: 'app-create-form-stepper',
  templateUrl: './create-form-stepper.component.html',
  styleUrls: ['./create-form-stepper.component.css', '../../shared/styles/loading-spinner.css'],
  providers:[CreateFormService]
})
export class CreateFormStepperComponent implements OnInit {

  private  inputRecipientsNumberCounter = 1;
  formDetails: FormGroup;

  fileUploadProgress = 0;


  constructor(public fb: FormBuilder, private service: FormsService,
     private serviceCreate: CreateFormService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();

    this.route.data
      .pipe(filter((data:any)=>data.record), map(res=>res.record.data))
    .subscribe(data=>{
      this.patchForm(data);
      this.setPDFAsBackground(data.upload._id)
    })

  }
  
  patchForm(res) {
    this.formDetails.patchValue({
      title:res.title,
      // direction:res.direction,
      // language:res.language,
      reference_width:res.reference_width,
      upload_id:res.upload_id,
    });
    
    this.formDetails.setControl('notification_emails',this.fb.array(res.notification_emails))
    this.formDetails.setControl('recipient_templates',this.serviceCreate.toFormArray(res.recipient_templates || []))
    this.formDetails.setControl('inputs',this.serviceCreate.inputsToFormArray(res.inputs || []))
  }

  setPDFAsBackground(upload_id: any) {
    this.serviceCreate.pdfSource = `${API_DOMAIN}eforms/uploads/${upload_id}/pdf`
  }

  initForm(): void {
    this.formDetails = this.fb.group({
      title: '',
      // direction: 'right',
      // language: 'he',
      reference_width: null,
      upload_id: '',
      notification_emails: this.fb.array([]),
      recipient_templates: this.fb.array([]),
      inputs: this.fb.array([]),
    });
  }

  get notification_emails(): FormArray {
    return this.formDetails.get('notification_emails') as FormArray;
  }
  get recipient_templates(): FormArray {
    return this.formDetails.get('recipient_templates') as FormArray;
  }
  get inputs(): FormArray {
    return this.recipient_templates.get('inputs') as FormArray;
  }
  get upload_id(): FormControl {
    return this.formDetails.get('upload_id') as FormControl;
  }



  handleFileInput(upload){

    if(upload.type !== 'application/pdf'){
      confirm('חובה להעלות קובץ PDF');
      return;
    }

    const formData: FormData = new FormData();
    formData.append('file', upload);

    this.service.uploadForm(formData).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {

        case HttpEventType.UploadProgress:
          this.fileUploadProgress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          const {_id}= event.body.data;
          
          this.formDetails.patchValue({upload_id: _id})
          this.serviceCreate.pdfSource = `http://165.232.35.89/eforms/uploads/${_id}/pdf`
      }
  })
}


  print(): void{
    console.log(this.formDetails.value);
  }

  onAddNotificationEmail(): void{
    this.notification_emails.push(this.fb.control('', Validators.email));
  }
  onAddRecepient(): void{
    this.recipient_templates.push(this.fb.group({label: '', number: this.inputRecipientsNumberCounter++}));
  }


  onSubmitForm(){
    this.service.createForm(this.formDetails.value).subscribe(res=>console.log(res))
  }
}
