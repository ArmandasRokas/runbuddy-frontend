import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  constructor(
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.hardcodedAuthenticationService.setUsername(sessionStorage.getItem('authenticaterUser'))
  }
}
