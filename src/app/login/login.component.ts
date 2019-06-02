import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = 'Invalid Credentials'
  username = 'username'
  password = ''
  invalidLogin = false

  constructor() { }

  ngOnInit() {
  }

  handleLogin() {
    if (this.username === "username" && this.password === "pass") {
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }
}
