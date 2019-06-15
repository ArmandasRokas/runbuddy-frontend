import { Component, OnInit } from '@angular/core';
import { RouteDataService } from '../service/data/route-data.service';
import { Route, WayPoint } from '../enitities/route';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../user/shared/user';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  routeId: String
  route: Route
  errorMessage: String;
  sumbited = false;

  constructor(
    private routeDataService: RouteDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.routeId = this.activatedRoute.snapshot.params['id']
      this.route = new Route(this.routeId, "", new Location("", "", "", "", ""), new Date(), 0,0,"","",undefined,10000 ,0,0, false)
    if (this.routeId != 'newRoute') {
      this.routeDataService.retrieveRoute(localStorage.getItem('userId'), this.routeId).subscribe(
        data => {
          this.route = data
        console.log(data)},
        error => this.handleErrorResponse(error)
      )
    }

  }
  saveRoute() {
    this.sumbited = true;
    if (this.routeId === 'newRoute') {
      
      this.routeDataService.createRoute(localStorage.getItem('userId'), this.route).subscribe(
        data => {
          this.router.navigate(['myroutes'])
        },
        error => this.handleErrorResponse(error)
    )
    } else {
      this.routeDataService.updateRoute(this.routeId, this.route).subscribe(
        data => {
          this.router.navigate(['myroutes'])
        },
        error => this.handleErrorResponse(error)
      )
    }
  }
  removeWayPoint(index) {
    this.route.wayPoints.splice(index, 1)
  }
  addWayPoint() {
    var index = 1
    var wayPoint = new WayPoint(0, 0, index)
    if (this.route.wayPoints === undefined || this.route.wayPoints.length === 0 ) {
      var wayPoints: WayPoint[] = [wayPoint]
      this.route.wayPoints = wayPoints
    } else {
      wayPoint.index = this.route.wayPoints[this.route.wayPoints.length - 1].index + 1
      this.route.wayPoints.push(wayPoint)
    }
    console.log(this.route)
  }

  cancel() {
    this.router.navigate(['myroutes'])
  }

  handleErrorResponse(error) {
    if (error.error.message != null) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = "Error: Could not get connection to server";
    }
  }
}
