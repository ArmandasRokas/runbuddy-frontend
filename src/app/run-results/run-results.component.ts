import { Component, OnInit } from '@angular/core';
import { RunDataService } from '../service/data/run-data.service';
import { Run } from '../enitities/run';
import { ActivatedRoute } from '@angular/router';
import { Route, WayPoint } from '../enitities/route';
import { Location } from '../user/shared/user';

@Component({
  selector: 'app-run-results',
  templateUrl: './run-results.component.html',
  styleUrls: ['./run-results.component.css']
})
export class RunResultsComponent implements OnInit {

  runId: String
  run: Run
  waypoints: WayPoint[]
  totalTime:number
  errorMessage: String;

  constructor(
    private runDataService: RunDataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.runId = this.activatedRoute.snapshot.params['id']
    this.run = new Run(this.runId, new Route("", "", new Location("", "", "", "", ""), new Date(), 0, 0, "", "", undefined, 0, 0, 0), null, new Date(), new Date())
      this.runDataService.retrieveRunWithLatestCheckpoints(this.runId).subscribe(
        data => {
          this.run = data
          console.log(data)
          this.totalTime = this.run.startTime.getTime()-this.run.endTime.getTime()
        },
        error => this.handleErrorResponse(error)
    )

    this.runDataService.getMissingWaypoints(this.runId).subscribe(
      data => {
        this.waypoints = data
      },
      error => this.handleErrorResponse(error)
    )
  }

  handleErrorResponse(error) {
    this.errorMessage = error.error.message
  }

}
