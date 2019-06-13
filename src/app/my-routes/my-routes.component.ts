import { Component, OnInit } from '@angular/core';
import { Route } from '../enitities/route';
import { RouteDataService } from '../service/data/route-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-routes',
  templateUrl: './my-routes.component.html',
  styleUrls: ['./my-routes.component.css']
})
export class MyRoutesComponent implements OnInit {
  deletedMessage : string 
  routes: Route[]
  errorMessage: String
  //routes = [
  //  new Route("1", "Fun run", new Date()),
  //  new Route("2", "My favorite run", new Date()),
  //  new Route("3", "Cultural run", new Date())
  //]


  constructor(
    private routeDataService: RouteDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshRoutes()
  }

  refreshRoutes() {
    this.routeDataService.retrieveUserRoutes('1').subscribe( // creatorId is hardcoded 
      response => {
        this.routes = response
      }
    )
  }

  deleteRoute(routeId) {
    this.routeDataService.deleteRoute(routeId).subscribe(
      response => {
        this.refreshRoutes()
        this.deletedMessage = 'Delete is successful!'
      },
      error => this.handleErrorResponse(error)
     )
  }

  updateRoute(routeId) {
    this.router.navigate(['route', routeId])
  }

  createRoute() {
    this.router.navigate(['route', 'newRoute'])
  }
  handleErrorResponse(error) {
    console.log(error.error.message)
    if (error.error.message != null) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = "Error: Could not get connection to server";
    }
  }
}
