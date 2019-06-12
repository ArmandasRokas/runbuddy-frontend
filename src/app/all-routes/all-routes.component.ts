import { Component, OnInit } from '@angular/core';
import { Route } from '../enitities/route';
import { RouteDataService } from '../service/data/route-data.service';
import { Router } from '@angular/router';
import { RunDataService } from '../service/data/run-data.service';
import { Run } from '../enitities/run';

@Component({
  selector: 'app-all-routes',
  templateUrl: './all-routes.component.html',
  styleUrls: ['./all-routes.component.css']
})
export class AllRoutesComponent implements OnInit {

  //routes: Route[]
  routes = [
   //new Route("1", "Fun run", new Date(), []),
   // new Route("2", "My favorite run", new Date(), []),
   // new Route("3", "Cultural run", new Date(), [])
  ]
  run: Run;

  constructor(
    private runDataService: RunDataService,
    private routeDataService: RouteDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshRoutes()
  }

  refreshRoutes() {
    this.routeDataService.retrieveAllRoutes().subscribe( 
      response => {
      this.routes = response
      }
    )
  }

  signUpForRoute(routeId) {
    
    this.run = new Run()
    this.run.route = new Route(routeId, null, null, null)
    this.runDataService.createRun('1', this.run).subscribe(
      data => {
        this.router.navigate(['myruns'])
      })
  }

}
