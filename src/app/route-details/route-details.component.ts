import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteDataService } from '../service/data/route-data.service';
import { Route } from '../enitities/route';
import { Location, User } from '../user/shared/user';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  routeId: String;
  route: Route;
  errorMessage: String;
  participants: User[];

  constructor(
    private routeDataService: RouteDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.routeId = this.activatedRoute.snapshot.params['id']
      this.route = new Route(this.routeId, "", new Location("", "", "", "", ""), new Date(), 0,0,"","released",undefined,10000 ,0,0, false, undefined)
    if (this.routeId != 'newRoute') {
      this.routeDataService.retrieveRoute(localStorage.getItem('userId'), this.routeId).subscribe(
        data => {
          this.route = data
        console.log(data)},
        error => this.handleErrorResponse(error)
      )

      this.routeDataService.retrieveParticipants(this.routeId).subscribe(
        data => {
          this.participants = data
        console.log(data)},
        error => this.handleErrorResponse(error)
      )
    }
  }

  return(){
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
