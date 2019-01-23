import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { HeaderService } from './header.service';
import { AuthService } from '../auth/auth.service';

interface Data {
  value: string;
  email: string;
  password: string | number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedValue: string;
  data: Data[];
  userIsAuthenticated = false;
  private authListener: Subscription;

  constructor(public headerService: HeaderService, public authService: AuthService) { }

  ngOnInit() {
    this.data = this.headerService.getData();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListener = this.authService
      .getAuthStatusListener()
        .subscribe(newStatus => {
          console.log('newStatus', newStatus);
          this.userIsAuthenticated = newStatus;
        });
  }

  changeSelect(value) {
    this.data.map(el => {
      if (el.value === value) {
        this.headerService.setHeaderValue(el.email, el.password);
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
