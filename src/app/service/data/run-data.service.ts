import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WayPoint } from 'src/app/enitities/route';
import { Checkpoint, Run } from 'src/app/enitities/run';

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
  getLatestCheckpoints(runId) {
    return this.http.get<Checkpoint[]>(`http://localhost:8080/run/${runId}/checkpoint`)
  }

  createRun(creatorId, run){
    return this.http.post(`http://localhost:8080/users/${creatorId}/run`, run)
  }

  retrieveRun(runId){
    return this.http.get<Run>(`http://localhost:8080/run/${runId}`)
  }
}
