import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { HeaderService } from '../header/header.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailInput = '';
  passwordInput = '';
  error = '';
  private headerDataListener: Subscription;
  private errorListener: Subscription;

  constructor(public authService: AuthService, private headerService: HeaderService) { }

  ngOnInit() {
    this.headerDataListener = this.headerService
    .getHeaderDataListener()
    .subscribe(data => {
      this.emailInput = data.email;
      this.passwordInput = data.password;
    });
    this.errorListener = this.authService
    .getErrorListener()
    .subscribe(error => {
      this.error = error;
    });
  }

  onLogin(form: NgForm) {
    this.authService.login(form.value.email, form.value.password);

  }

}
