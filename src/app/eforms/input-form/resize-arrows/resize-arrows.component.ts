import { Component, Input, OnInit } from '@angular/core';
import { inputTypes } from 'src/app/constants/eforms_const';
import { CreateFormService } from '../../create-form/create-form.service';

@Component({
  selector: 'app-resize-arrows',
  templateUrl: './resize-arrows.component.html',
  styleUrls: ['./resize-arrows.component.css']
})
export class ResizeArrowsComponent implements OnInit {

  @Input() input
  constructor(public service: CreateFormService) { }

  ngOnInit(): void {}

  handleResizeInput(event){
    this.service.handleResizeInput()

    event.stopPropagation()
  }

}
