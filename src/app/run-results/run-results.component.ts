import { Component, OnInit } from '@angular/core';
import { RunDataService } from '../service/data/run-data.service';
import { Run } from '../enitities/run';
import { ActivatedRoute } from '@angular/router';
import { Route } from '../enitities/route';

@Component({
  selector: 'app-run-results',
  templateUrl: './run-results.component.html',
  styleUrls: ['./run-results.component.css']
})
export class RunResultsComponent implements OnInit {

  runId: String
  run: Run

  constructor(
    private runDataService: RunDataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.runId = this.activatedRoute.snapshot.params['id']
    this.run = new Run(this.runId, new Route("2","routeyroute",new Date(),[]), null, new Date(), new Date())
      this.runDataService.retrieveRunWithLatestCheckpoints(this.runId).subscribe(
        data => {
          this.run = data
        console.log(data)}
      )
  }

}
