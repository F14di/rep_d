import { CreateFormService } from './create-form.service';
import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FORM_STATUS } from '../../constants/eforms_const'

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent implements OnInit, OnDestroy, AfterViewInit {

  FORM_STATUS = FORM_STATUS

  
  @ViewChild('pdfContainer') pdfContainer: ElementRef;

  @Input() form: FormGroup;

  constructor(public serviceCreate: CreateFormService) { }

  ngOnInit(): void {
    this.serviceCreate.inputs = this.form.get('inputs');
  }

  ngAfterViewInit(): void {
    this.serviceCreate.pdfContainer = this.pdfContainer;
    this.serviceCreate.form = this.form
    // this.serviceCreate.setForm(this.form);
  }
  
  get inputTypeSelected(){
    return this.serviceCreate.inputTypeSelected
  }

  ngOnDestroy(): void {
    this.serviceCreate.clearAllEventListeners();
  }

  print(): void{
    console.log(this.form);
  }

  selectInputType(index): void{
    this.serviceCreate.selectInputType(index);
  }

  addInputToForm(event): void{
    this.serviceCreate.addInputToForm(event);
  }

  reLocateReferencePoint(): void{
    // update the width of the PDF in the form
    this.form.patchValue({reference_width:document.querySelectorAll('.canvasWrapper')[0].getBoundingClientRect().width})
    
    this.serviceCreate.reLocateReferencePoint();
  }

  onPdfLoaded(event): void{
    this.serviceCreate.onPdfLoaded(event);
  }

  selectInput(index): void{
    this.serviceCreate.selectInput(index);
  }

  deleteOpenedInput(){
    this.serviceCreate.deleteOpenedInput();
  }


  exitToolbar(): void{
    this.serviceCreate.exitToolbar();
  }

  resizing(event):void {
    this.serviceCreate.resizing(event)
  }
  stopResize(event){
    this.serviceCreate.stopResize(event)
  }
  
}
