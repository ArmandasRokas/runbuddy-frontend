import { Component, OnInit } from '@angular/core';
import { Route } from '../enitities/route';

@Component({
  selector: 'app-my-routes',
  templateUrl: './my-routes.component.html',
  styleUrls: ['./my-routes.component.css']
})
export class MyRoutesComponent implements OnInit {

  routes = [
    new Route("1", "Fun run", new Date()),
    new Route("2", "My favorite run", new Date()),
    new Route("3", "Cultural run", new Date())
  ]

  constructor() { }

  ngOnInit() {
  }

}
