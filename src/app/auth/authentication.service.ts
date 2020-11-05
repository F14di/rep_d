import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

import {API_DOMAIN} from '../constants/app_const';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private loggedUserSubject: BehaviorSubject<User>;
  public loggedUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

      this.loggedUserSubject = new BehaviorSubject<User>(loggedUser);
      this.loggedUser = this.loggedUserSubject.asObservable();
  }

  public get loggedUserValue(): User {
      return this.loggedUserSubject.value;
  }

  get user(): Observable<User> {
    return this.loggedUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<{data: any}> {
    return this.http.post<{data?: any, errors?: string, success?: string}>(`${API_DOMAIN}auth/login`, { username, password })
    .pipe(map(httpResponse => {
      if(httpResponse.success === 'false'){
        return false;
      }
      const user = httpResponse.data;
      localStorage.setItem('loggedUser', JSON.stringify(user));
      this.loggedUserSubject.next(user);
      return user;
        }
      ));
    // return this.http.post<any>(`/users/authenticate`, { username, password })
    //     .pipe(map(user => {
    //         localStorage.setItem('loggedUser', JSON.stringify(user));
    //         this.loggedUserSubject.next(user);
    //         return user;
    //     }));
  }

  logout(): Observable<any> {
    localStorage.removeItem('loggedUser');
    this.loggedUserSubject.next(null);
    this.router.navigate(['/login']);

    return this.http.post(`/auth/logout`, {});
  }
}
