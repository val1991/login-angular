import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private errorListener = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getErrorListener() {
    return this.errorListener.asObservable();
  }

  login(email: string, password: string) {
    const loginData: AuthData = {
      email,
      password,
    };
    if (loginData.email === 'true@email.com' && loginData.password === 'true1') {
      this.authStatusListener.next(true);
      this.saveAuthData('true');
      this.router.navigate(['/main']);
    } else {
      this.http.post('http://localhost:3000/api', loginData)
      .subscribe(response => {
        const token = response; // example
        this.authStatusListener.next(true);
      }, error => {
        console.log('error', error);
        this.authStatusListener.next(false);
        this.errorListener.next('error auth');
      });
    }
  }

  logout() {
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    console.log('​AuthService -> autoAuthUser -> authInformation', authInformation);
    if (!authInformation) {
      return;
    }
    this.isAuthenticated = true;
  }

  private saveAuthData(status: string) {
    localStorage.setItem('status', status);
  }

  private clearAuthData() {
    localStorage.removeItem('status');
  }

  private getAuthData() {
    const status = localStorage.getItem('status');
    if (!status) {
      return;
    }
    return {
      status
    };
  }
}
