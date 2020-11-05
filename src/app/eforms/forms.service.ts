import { Form } from './../models/form';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {API_DOMAIN} from '../constants/app_const';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({providedIn: 'root'})
export class FormsService {

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  paginateForms(active: string, direction: string, pageIndex: number): Observable<Form> {
    return this.http.get<Form>(`${API_DOMAIN}eforms/forms?sort=${active}&order=${direction}&page=${pageIndex + 1}`);
  }

  uploadForm(formData: FormData): Observable<any> {
    return this.http.post<FormData>(`${API_DOMAIN}eforms/uploads`, formData,
    {
      reportProgress: true,
      observe: 'events'
    });
  }

  createForm(form: any) {
    return this.http.post<FormData>(`${API_DOMAIN}eforms/forms`, form)
  }

  loadRecordPdf(id: any) {
    return this.http.get<Form>(`${API_DOMAIN}eforms/forms/${id}`);
  }

  sendFormForFilling(form: { recipients: any; inputs: any[]; }, upload_id) {
    return this.http.post(`${API_DOMAIN}eforms/forms/${upload_id}/send`, form)
  }

  paginateRecords(active: string, direction: string, pageIndex: number): any {
    return this.http.get<Form>(`${API_DOMAIN}eforms/forms?sort=${active}&order=${direction}&page=${pageIndex + 1}`);
  }

}