import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FormsService } from 'src/app/eforms/forms.service';

@Injectable({providedIn: 'root'})
export class RecordResolver implements Resolve<any>{

  constructor(private formsService: FormsService) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this.formsService.loadRecordPdf(route.params['recordId'])
  }
}
