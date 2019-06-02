import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username, password) {
    if (username === "username" && password === "pass") {
      sessionStorage.setItem('authenticaterUser', username)
      return true
    } else {
      return false
    }
  }
}
