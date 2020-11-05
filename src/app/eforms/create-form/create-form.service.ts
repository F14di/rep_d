import { TextfieldInput } from '../input-fields/textfield-input';
import { DateInput } from '../input-fields/date-input';
import { CheckboxInput } from '../input-fields/checkbox-input';
import { TextareaInput } from '../input-fields/textarea-input';
import { SignatureInput } from '../input-fields/signature-input';

import { ElementRef, Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { inputTypes } from '../../constants/eforms_const';
import { InputBase } from '../input-fields/input-base';
import { inputsMinDim } from '../../constants/eforms_const'
import { debounce } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class CreateFormService {

   
  inputTypes = [...inputTypes];
  inputTypeSelected = null;

  inputSettings: FormGroup;

  public selectedInput: any = null;
  // FormArray that holds inputs of type formGroup
  private inputsFormArray: FormArray ;
  public form: FormGroup = new FormGroup({});

  mouseCoordinates: {x: number, y: number};

  // REDUNDANT ?!
  inputCoords: {x: number, y: number} = {
    x: null,
    y: null
  };

  private pdfFile = {
    id: '',
    pdfSrcUrl: '',
    numOfPages: 0,
    properties: {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

  };
  pdfContainer: ElementRef<any>;


  isDragging
  isResizingInput ;



  constructor(private fb: FormBuilder) {     

  }



  setForm(form: FormGroup) {
    this.form = form;
  }
  
  set pdfSource(value: any) {
    this.pdfFile.pdfSrcUrl = value;
  }

  get pdfSource(): any{
    if (!this.pdfFile.pdfSrcUrl) {
      return;
    }
    return this.pdfFile.pdfSrcUrl;
  }

  get inputs(): any{
    if(!this.form.get('inputs')) return this.fb.array([])
    return this.form.get('inputs') as FormArray;
  }

  set inputs(inputsArray: any){
    this.inputsFormArray = inputsArray;
  }

  inputsToFormArray(inputs: any): any {
    // needs to be performed differently when the group has plain arrays as values
    return this.fb.array(inputs.map(input=>this.fb.group({value:'', ...this.getBaseInput(input.type, input), recipients:[input.recipients]})))
  }
  
  toFormArray(array: any): any {
    return this.fb.array(array.map(el=>this.fb.group(el)));
  }


/**
 * As the user selects an input to add,
 * the selected type of input is saved and the mouse coordinates
 * are tracked
 *
 * @param index of the types of input
 */
  selectInputType(index): void {
    this.inputTypeSelected = this.inputTypes[index];

    window.onmousemove = event => {
      this.mouseCoordinates = {
        x : event.pageX,
        y: event.pageY
      };
    };
  }

/**
 * selects an input for changing its settings
 * @param index input index in Inputs FormArray
 */
  selectInput(index: any): void{
    this.selectedInput = this.inputs.at(index);
    this.selectedInput.addControl('inputBaseArrayIndex', new FormControl(index));
    // this.selectedInput.set
    // this.selectedInput.enable();
  }

  deleteOpenedInput(): void {

    const index = this.inputs.value.findIndex(input => input.inputBaseArrayIndex == this.selectedInput.value.inputBaseArrayIndex) 

    this.exitToolbar();
    this.inputs.removeAt(index);
  }

  exitToolbar(): void {
    this.selectedInput = null;
  }


  handleResizeInput() {
    this.worker = new Worker('../../shared/workers/handle-input-resize.worker', { type: 'module' });
    this.worker.onmessage = ({ data }) => {
     console.log(`page got message: ${data}`);
   };

    this.isResizingInput = true;
  }

  stopResize(event) {
    if (!this.isResizingInput){
      return;
    }
    
    this.isResizingInput = false;
    this.worker.terminate()

    event.stopPropagation();
  }
  


  private worker: Worker;
  private onMessage = new Subject<MessageEvent>();
  private onError = new Subject<ErrorEvent>();



  resizing({pageX, pageY}) {
    if (!this.isResizingInput) {
      return
    }

    
    if (typeof Worker !== 'undefined') {
      
      const functionBody = this.resizeElement.toString().replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '');


        this.worker.postMessage({pageX, pageY, resizer:functionBody});
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
    



    // this.resizeElement(pageX, pageY);
  }


resizeElement(pageX, pageY) {
  const {scrollLeft, scrollTop} = this.pdfContainer.nativeElement;
  this.selectedInput.patchValue({
    width : pageX - (this.selectedInput.value.x + this.pdfFile.properties.left - scrollLeft),
    height:pageY - (this.selectedInput.value.y + this.pdfFile.properties.top - scrollTop)
  });
  this.isResizingInput = this.isValidDimensions();
}

  /**
   *  prevent rescaling the dimensions to smaller than the minimum
   * 
   */
  isValidDimensions() {
    if(this.selectedInput.value.width<50 || this.selectedInput.value.height<15){
      return false
    }
    return this.selectedInput.value.width>=inputsMinDim[this.selectedInput.value.type].width-3 && this.selectedInput.value.height>=inputsMinDim[this.selectedInput.value.type].height-3
  }


  updateCoords(distance: {x:number, y:number}, input: AbstractControl) {
    const currentX = input.value.x;
    const currentY = input.value.y;

    input.patchValue({
      x: currentX + distance.x ,
      y: currentY + distance.y ,
    })

  }

  getInputDefaultSettings(pageX, pageY): {} {
    // if scrolled along the pdfFile, take the scrolling distance into account
    const {scrollLeft, scrollTop} = this.pdfContainer.nativeElement;
    const defaultSettings = {
      x: pageX - this.pdfFile.properties.left + scrollLeft,
      y: pageY - this.pdfFile.properties.top + scrollTop,
      recipients:[0],
      required:true
    }



    // Auto align inputs added (20px epsilon b  )    
    for(let i=this.inputs.length-1; i>=0;i--){
      if(Math.abs(this.inputs.at(i).value.y - defaultSettings.y)<20){
        defaultSettings.y = this.inputs.at(i).value.y;
        break;
      }
    }

    return defaultSettings
  }

  addInputToForm({pageX, pageY}): void{
    this.reLocateReferencePoint();
    if (!this.inputTypeSelected) { return; }

    const inputBase = this.getBaseInput(this.inputTypeSelected.type, this.getInputDefaultSettings(pageX, pageY));

    if (inputBase){
      this.addInputToArray(inputBase);
    }

    this.selectInput(this.inputs.length - 1);
    this.resetAfterInputAdded();
  }

  addInputToArray(inputBase) {
    // unable to add the array to the formGroup values.
    // should be done this way
    const inputBaseFG = this.fb.group(
      {...inputBase,
        recipients: new FormControl(inputBase.recipients),
        validators: new FormControl(inputBase.validators)
      });

    (this.inputsFormArray.parent.get('inputs') as FormArray).push(inputBaseFG);
  }

  getBaseInput(type: string, inputCrds): InputBase<string>{
    switch (type){
      case 'text':
        return new TextfieldInput(inputCrds);
      case 'date':
        return new DateInput(inputCrds);
      case 'checkbox':
        return new CheckboxInput(inputCrds);
      case 'textarea':
        return new TextareaInput(inputCrds);
      case 'signature':
        return new SignatureInput(inputCrds);
      default:
        return null;
    }

  }


  onWindowResize(): ((this: GlobalEventHandlers, ev: UIEvent) => any) & ((this: Window, ev: UIEvent) => any) {
    if (!this.pdfFile) {
      return;
    }
    this.reLocateReferencePoint();
  }

  // @ViewChild('pdfContainer') pdfContainer: ElementRef;

  /**
   * saves the reference point of the pdf
   * after the pdf is rendered or the user scrolls the page
   */
  reLocateReferencePoint(): void {
    // update referencePoint
    let pdfCont: any;
    pdfCont = this.pdfContainer?.nativeElement;
    if(!pdfCont) return;

    const box =  pdfCont && pdfCont.getBoundingClientRect();
    // box.top + window.pageYOffset

    this.pdfFile.properties.top = box.top + window.pageYOffset;
    this.pdfFile.properties.left = box.left + window.pageXOffset;
    this.pdfFile.properties.right = box.left + box.width + window.pageXOffset;
    this.pdfFile.properties.bottom = box.top + box.height + window.pageYOffset;
    this.pdfFile.properties.width = box.width;

    

  }

  onPdfLoaded(event): void{
    if (!this.pdfFile.numOfPages){
      this.pdfFile.numOfPages = event.numPages;
    }
    document.getElementsByClassName('ng2-pdf-viewer-container')[0]['style'].overflow = 'visible';

  }




/**
 * Resets the settings after adding an input field
 */
  resetAfterInputAdded(): void {
    this.inputTypeSelected = null;
    this.inputCoords.x = null;
    this.inputCoords.y = null;

    window.onmousemove = null;
  }


  clearAllEventListeners(): void {
    window.onmousemove = null;
    window.onresize = null;
    window.onmousedown = null;
    window.onmouseout = null;
    window.onmouseup = null;
  }

  
/**
 * 
 * Returns the form value in the correct "form"
 * with the desired attributes !
 * @param value 
 */
  getFormValue(value: any) {

    const {inputs, recipients} = value;


    // Creates an array in the form of: [{id:value},{id:value},...]
    const inputsArray=[];
    for (let i = 0; i < inputs.length; i++) {
      inputsArray.push({[inputs[i].id] : inputs[i].value});
    }

    const post_data={
      recipients: recipients.map(recipient=>{
        return {
          template_number:recipient.number,
          name:recipient.name,
          contact_method:recipient.contact_method,
          contact_value:recipient.contact_value,
          external_id:recipient.external_id
        }
      }),
      inputs:inputsArray
    }
    
    return post_data; 
  }

//   {
//     "recipients" : [{
//         "template_number": 1,
//         "name": "Test Recipient",
//         "contact_method": "email",
//         "contact_value": "shadyhossin@gmail.com",
//         "external_id": 123
//     }],
//     "inputs" : [
//         {"5f79ce350ef6624e7737cf33": "שאדי"},
//         {"5f79ce350ef6624e7737cf33": true}
//     ]
// }

}

