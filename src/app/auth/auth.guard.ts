import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // get logged user from AuthService
      const currentUser = this.authenticationService.loggedUserValue;
      if (currentUser) {
          return true;
      }

      
      this.router.navigate(['/']);
      return false;
  }

}
