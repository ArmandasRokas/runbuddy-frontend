import { Component, OnInit } from '@angular/core';
import { RunDataService } from '../service/data/run-data.service';
import { Run } from '../enitities/run';
import { Route } from '../enitities/route';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-runs',
  templateUrl: './my-runs.component.html',
  styleUrls: ['./my-runs.component.css']
})
export class MyRunsComponent implements OnInit {

  errorMessage: String;
  runs: Run[] //= [
    //new Run("runrun",new Route("2","routeyroute",new Date(),[]),[],new Date(),new Date())
  //]

  constructor(
    private runDataService: RunDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshRuns()
  }

  refreshRuns() {
    this.runDataService.retrieveRuns("1").subscribe(
      response => {
        this.runs = response
      },
      error => this.handleErrorResponse(error)
    )
  }

  startRun(runId) {
    this.router.navigate(['run',runId, 'run' ])
  }
  continueRun(runId) {
    this.router.navigate(['run', runId, 'continue'])
  }

  handleErrorResponse(error) {
    if (error.error.message != null) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = "Error: Could not get connection to server";
    }
  }

}
