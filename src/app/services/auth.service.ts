import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtToken: string = sessionStorage.getItem('jwtToken') || "{}";

  constructor(
    private notification: NzNotificationService
  ) { }

  isLoggedIn() {
    return !!sessionStorage.getItem('jwtToken');
  }

  getToken() {
    return this.jwtToken;
  }

  getNameOfAccount(): string {
    return ""
  }
}
