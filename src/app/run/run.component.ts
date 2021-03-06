
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { Route, WayPoint } from '../enitities/route';
import { RouteDataService } from '../service/data/route-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RunDataService } from '../service/data/run-data.service';
import { Checkpoint, Run } from '../enitities/run';
import { ToastrService } from 'ngx-toastr';


class WayPointBubbleData {
  x: number;
  y: number;
  r: number;

  constructor(item: WayPoint) {
    this.x = item.x;
    this.y = item.y;
    this.r = 20;
  }
}
class CheckPointBubbleData {
  x: number;
  y: number;
  r: number;

  constructor(item: Checkpoint) {
    this.x = item.wayPoint.x;
    this.y = item.wayPoint.y;
    this.r = 20;
  }
}

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.css']
})

export class RunComponent implements OnInit {
  waypoints: WayPoint[]
  checkpoints: Checkpoint[]
  runId: String
  action: String
  run: Run = new Run("",null, null, new Date(), new Date())
  currUserX: number
  currUserY: number
  errorMessage: String;

  public bubbleChartOptions: ChartOptions = {
    tooltips: {
      callbacks: {
        label: function (t, d) {
          return d.datasets[t.datasetIndex].label +
            ': (X:' + t.xLabel + ', Y:' + t.yLabel + ')'; //https://stackoverflow.com/questions/45249779/chart-js-bubble-chart-changing-dataset-labels
        }
      }
    },

    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0,
            max: 30,
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 30,
          }
        }
      ]
    }
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartData: ChartDataSets[] = [
    {
      data: [
        //{ x: 10, y: 10, r: 20 }, //Test data
        //{ x: 15, y: 5, r: 20 },
        //{ x: 26, y: 12, r: 20 },
        //{ x: 7, y: 8, r: 20 },
      ],
      label: 'Missing',
      backgroundColor: 'red',
      borderColor: 'blue',
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'red',
    },
    {
      data: [
        //{ x: 12, y: 12, r: 20 }, //Test data
        //{ x: 17, y: 7, r: 20 },
        //{ x: 28, y: 14, r: 20 },
        //{ x: 9, y: 10, r: 20 },
      ],
      label: 'Visited',
      backgroundColor: 'green',
      borderColor: 'blue',
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'red',
    }
  ];

  constructor(
    private runDataService: RunDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.runId = this.activatedRoute.snapshot.params['id']
    this.action = this.activatedRoute.snapshot.params['action']
    if (this.action === "run") {
      this.runDataService.retrieveRun(this.runId).subscribe(
        response => {
          this.run = response
          this.run.startTime = new Date()
          this.runDataService.updateRun(this.runId, this.run).subscribe(
            response => { },
            error => this.handleErrorResponse(error)
          )
        },
        error => this.handleErrorResponse(error)
      )
    } else {
      this.runDataService.retrieveRun(this.runId).subscribe(
        response => 
          this.run = response
      ),
        error => this.handleErrorResponse(error)
    }
    this.refreshBubbles() 

  }

  refreshBubbles() {
    this.runDataService.getMissingWaypoints(this.runId).subscribe(
      data => {
        this.waypoints = data
        console.log(data)
        let waypointstobubblearr = this.waypoints.map(item => new WayPointBubbleData(item));
        this.bubbleChartData[0].data = waypointstobubblearr;
      },
      error => this.handleErrorResponse(error)
    )
    this.runDataService.getLatestCheckpoints(this.runId).subscribe(
      data => {
        this.checkpoints = data
        console.log(data)
        let checkpointbubblearr = this.checkpoints.map(item => new CheckPointBubbleData(item));
        this.bubbleChartData[1].data = checkpointbubblearr;
      },
      error => this.handleErrorResponse(error)
    )
  }

  //  events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  submit() {
    this.runDataService.addCheckPointIfValid(this.runId, this.currUserX, this.currUserY, 2).subscribe(
      response => {
        this.refreshBubbles()
        this.toastr.success("Success waypoint found");
      },
      error => this.handleErrorResponse(error) 
    )
  }

  endRun() {
    this.run.endTime = new Date()
    this.runDataService.updateRun(this.runId, this.run).subscribe(
      response => { this.router.navigate(['runresults', this.runId]) },
      error => this.handleErrorResponse(error)
    )
  }

  handleErrorResponse(error) {
    
    if (error.error.message != null) {
      this.toastr.warning(error.error.message);
    } else {
      this.toastr.error("Error: Could not get connection to server");
    }
  }
}
