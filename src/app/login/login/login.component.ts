import { UserCredentials } from './../../models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userCredentialsForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private snackbar: MatSnackBar,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    if (this.authenticationService.loggedUserValue) {
      this.router.navigate(['/home']);
    }
    this.initForm();
  }

  initForm(): void {
    this.userCredentialsForm = this.fb.group({
      username: ['shadyhossin@gmail.com', Validators.required],
      password: ['a123123a', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userCredentialsForm.invalid) {
        return;
    }

    const {username, password}: UserCredentials = this.userCredentialsForm.value;

    this.authenticationService.login(username, password)
      .pipe(first())
      .subscribe(res => {
          if(!res){
            this.snackbar.open('הפרטים שהזנת לא תואמים לפרטים הקיימים במערכת. נא','',{duration:2000, direction:'rtl'});
            this.userCredentialsForm.reset()
          }else{
            this.router.navigate(['/home'])
          }
        })
  }

  get username(): FormControl{
    return this.userCredentialsForm.get('username') as FormControl;
  }

  get password(): FormControl{
    return this.userCredentialsForm.get('password') as FormControl;
  }
}
