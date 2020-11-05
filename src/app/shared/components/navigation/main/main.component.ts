import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loggedUser ;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.loggedUser.subscribe((user: User) => {
      this.loggedUser = user;
    });
  }

  logout(): void{
    this.auth.logout();
  }
}
