import { Injectable } from '@angular/core';

import { AuthData } from '../auth/auth-data.model';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private dataUsers = [
    {
      value: 'True email',
      email: 'true@email.com',
      password: 'true1',
    },
    {
      value: 'Wrong email',
      email: 'wrong@email.com',
      password: 'wrong1',
    }
  ];
  private headerDataListener = new Subject<AuthData>();

  getData() {
    return this.dataUsers;
  }

  getHeaderDataListener() {
    return this.headerDataListener.asObservable();
  }

  setHeaderValue(email: string, password: any) {
    const authData: AuthData = {
      email,
      password,
    };
    this.headerDataListener.next(authData);
  }
}
