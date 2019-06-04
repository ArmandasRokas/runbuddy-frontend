import { Component, OnInit } from '@angular/core';
import { RouteDataService } from '../service/data/route-data.service';
import { Route } from '../enitities/route';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  routeId: String
  route: Route

  constructor(
    private routeDataService: RouteDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.routeId = this.activatedRoute.snapshot.params['id']
    this.route = new Route(this.routeId, "", new Date())
    if (this.routeId != 'newRoute') {
      this.routeDataService.retrieveRoute('1', this.routeId).subscribe(
        data => this.route = data
      )
    }
  }
  saveRoute() {
    if (this.routeId === 'newRoute') {
      this.routeDataService.createRoute('1', this.route).subscribe(
        data => {
          this.router.navigate(['myroutes'])
        }
    )
    } else {
      this.routeDataService.updateRoute(this.routeId, this.route).subscribe(
        data => {
          this.router.navigate(['myroutes'])
        }
      )
    }
  }
}
