import { Component, OnInit } from '@angular/core';
import { Route } from '../enitities/route';
import { RouteDataService } from '../service/data/route-data.service';

@Component({
  selector: 'app-my-routes',
  templateUrl: './my-routes.component.html',
  styleUrls: ['./my-routes.component.css']
})
export class MyRoutesComponent implements OnInit {
  deletedMessage : string 
  routes: Route[]
  //routes = [
  //  new Route("1", "Fun run", new Date()),
  //  new Route("2", "My favorite run", new Date()),
  //  new Route("3", "Cultural run", new Date())
  //]


  constructor(
    private routeDataService: RouteDataService
  ) { }

  ngOnInit() {
    this.refreshRoutes()
  }

  refreshRoutes() {
    this.routeDataService.retrieveUserRoutes('1').subscribe( // creatorId is hardcoded 
      response => {
        console.log(response)
        this.routes = response
      }
    )
  }

  deleteRoute(routeId) {
    this.routeDataService.deleteRoute(routeId).subscribe(
      response => {
        this.refreshRoutes()
        this.deletedMessage = 'Delete is successful!'
      }
     )
  }

}
