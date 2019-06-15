import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { RunDataService } from '../service/data/run-data.service';
import { Run } from '../enitities/run';
import { ActivatedRoute } from '@angular/router';
import { Route, WayPoint } from '../enitities/route';
import { Location } from '../user/shared/user';

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {
  transform(value: number): string {
    const hours: number = Math.floor(value / 3600000)
    const minutes: number = Math.floor((value -= hours * 3600000)/60000);
    const seconds: number = Math.floor((value -= minutes*60000)/1000);
    const mili: number = (value -= seconds*1000);
    return hours + ':' + minutes + ':' + seconds + '.' + mili;
  }

}

@Component({
  selector: 'app-run-results',
  templateUrl: './run-results.component.html',
  styleUrls: ['./run-results.component.css']
})
export class RunResultsComponent implements OnInit {

  runId: String
  run: Run
  waypoints: WayPoint[]
  startTime: number
  endTime: number
  totalTime:number
  errorMessage: String;

  constructor(
    private runDataService: RunDataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.runId = this.activatedRoute.snapshot.params['id']
    this.run = new Run(this.runId, new Route("", "", new Location("", "", "", "", ""), new Date(), 0, 0, "", "", undefined, 0, 0, 0, false), null, new Date(), new Date())
      this.runDataService.retrieveRunWithLatestCheckpoints(this.runId).subscribe(
        data => {
          this.run = data
          this.startTime = new Date(this.run.startTime).getTime()
          this.endTime = new Date(this.run.endTime).getTime()
          this.totalTime = this.endTime - this.startTime
          console.log(this.totalTime)
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
    if (error.error.message != null) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = "Error: Could not get connection to server";
    }
  }

}
