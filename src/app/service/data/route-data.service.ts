import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from 'src/app/enitities/route';
import { User } from 'src/app/user/shared/user';

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

  retrieveParticipants(userId){
    return this.http.get<User[]>(`http://localhost:8080/routes/${userId}/users`)
  }

  //deleteRoute(routeId) {
  //  return this.http.delete(`http://localhost:8080/routes/${routeId}`)
  //}

  deleteRoute(routeId, route) {
    return this.http.put(`http://localhost:8080/routes/${routeId}`, route)
  }

  updateRoute(routeId, route) {
    return this.http.put(`http://localhost:8080/routes/${routeId}`, route)
  }
  createRoute(creatorId, route) {
    return this.http.post(`http://localhost:8080/users/${creatorId}/routes`, route)
  }
}
