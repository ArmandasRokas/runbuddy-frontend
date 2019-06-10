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

  retrieveAllRoutes(){
    return this.http.get<Route[]>(`http://localhost:8080/routes`)
  }
  retrieveUserRoutes(creatorId) {
    return this.http.get<Route[]>(`http://localhost:8080/users/${creatorId}/routes`)
  }
  retrieveRoute(userId, routeId) {
    return this.http.get<Route>(`http://localhost:8080/users/${userId}/routes/${routeId}`)
  }
  deleteRoute(routeId) {
    return this.http.delete(`http://localhost:8080/routes/${routeId}`)
  }
  updateRoute(routeId, route) {
    return this.http.put(`http://localhost:8080/routes/${routeId}`, route)
  }
  createRoute(creatorId, route) {
    return this.http.post(`http://localhost:8080/users/${creatorId}/routes`, route)
  }
}
