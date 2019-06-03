import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from 'src/app/enitities/route';

@Injectable({
  providedIn: 'root'
})
export class RouteDataService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveUserRoutes(creatorId) {
    return this.http.get<Route[]>(`http://localhost:8080/users/${creatorId}/routes`)
  }

  deleteRoute(routeId) {
    return this.http.delete(`http://localhost:8080/routes/${routeId}`)
  }
}
