import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WayPoint } from 'src/app/enitities/route';

@Injectable({
  providedIn: 'root'
})
export class RunDataService {

  constructor(
    private http: HttpClient
  ) { }

  getMissingWaypoints(runId) {
    return this.http.get<WayPoint[]>(`http://localhost:8080/run/${runId}/waypoint`)
  }
}
