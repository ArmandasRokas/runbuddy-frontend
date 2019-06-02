import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  handleLogin() {
    if (this.username === "username" && this.password === "pass") {
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }
}
