import { Component, OnInit } from '@angular/core';
import { Route } from '../enitities/route';
import { RouteDataService } from '../service/data/route-data.service';
import { Router } from '@angular/router';
import { RunDataService } from '../service/data/run-data.service';
import { Run } from '../enitities/run';
import { Location } from '../user/shared/user';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-all-routes',
  templateUrl: './all-routes.component.html',
  styleUrls: ['./all-routes.component.css']
})
export class AllRoutesComponent implements OnInit {
  errorMessage: String
  //routes: Route[]
  routes = [
   //new Route("1", "Fun run", new Date(), []),
   // new Route("2", "My favorite run", new Date(), []),
   // new Route("3", "Cultural run", new Date(), [])
  ]
  runs: Run[]
  run: Run;

  constructor(
    private runDataService: RunDataService,
    private routeDataService: RouteDataService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.refreshRoutes()
  }

  //refreshRoutes() {
  //  this.routeDataService.retrieveAllRoutes().subscribe( 
  //    response => {
  //      console.log(response)
  //      this.routes = response
  //      this.runDataService.retrieveRuns(localStorage.getItem('userId')).subscribe(
  //        response => {
            
  //          console.log(response)
  //          this.runs = response
  //          for (let run of this.runs) {
  //            console.log(this.routes.map(function (route) { return route.id; }).indexOf(run.route.id))
  //            this.routes.splice(this.routes.map(function (route) { return route.id; }).indexOf(run.route.id), 1)
  //          }
  //        },
  //        error => this.handleErrorResponse(error)
  //      )
  //    },
  //    error => this.handleErrorResponse(error)
  //  )

  //}
  refreshRoutes() {

    this.runDataService.retrieveRuns(localStorage.getItem('userId')).subscribe(
      response => {
        console.log(response)
        this.runs = response

        this.routeDataService.retrieveAllRoutes().subscribe(
          response => {
            console.log(response)
            this.routes = response
            for (let run of this.runs) {
            //  this.routes.splice(this.routes.map(function (route) { return route.id; }).indexOf(run.route.id), 1)
              this.routes[this.routes.map(function (route) { return route.id; }).indexOf(run.route.id)].signedUp = true;
            }
          },
          error => this.handleErrorResponse(error)
        )

      },
      error => this.handleErrorResponse(error)
    )
  }

  signUpForRoute(routeId) {
    
    this.run = new Run("newrun", null, null, null, null)
    this.run.route = new Route(routeId, "", new Location("", "", "", "", ""), new Date(), 0, 0, "", "", undefined, 0, 0, 0)
    this.runDataService.createRun(localStorage.getItem('userId'), this.run).subscribe(
      data => {
        this.router.navigate(['myruns'])
      },
      error => this.handleErrorResponse(error)
    )
  }

  handleErrorResponse(error) {
    if (error.error.message != null) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = "Error: Could not get connection to server";
    }
  }
}
