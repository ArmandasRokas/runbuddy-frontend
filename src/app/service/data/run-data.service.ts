import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.get<WayPoint[]>(`http://localhost:8080/runs/${runId}/waypoints`)
  }
  getLatestCheckpoints(runId) {
    return this.http.get<Checkpoint[]>(`http://localhost:8080/runs/${runId}/checkpoints`)
  }

  createRun(creatorId, run){
    return this.http.post(`http://localhost:8080/users/${creatorId}/runs`, run)
  }

  retrieveRun(runId){
    return this.http.get<Run>(`http://localhost:8080/runs/${runId}`)
  }

  addCheckPointIfValid(runId, currentX, currentY, precision) {
  //  let params = new HttpParams().set("currentX", currentX).set("currentY", currentY).set("presicion", precision);
    return this.http.put(`http://localhost:8080/runs/${runId}/checkpoints?currentX=${currentX}&currentY=${currentY}&precision=${precision}`, null)
  }
}
