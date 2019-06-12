
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { Route, WayPoint } from '../enitities/route';
import { RouteDataService } from '../service/data/route-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RunDataService } from '../service/data/run-data.service';
import { Checkpoint, Run } from '../enitities/run';


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


// bruge route data service til at hente
// complete button til. kun tilladt hvis alle point markeret

// get waypoints  routes/{id}/waypoints



export class RunComponent implements OnInit {
  waypoints: WayPoint[]
  checkpoints: Checkpoint[]
  runId: String
  run: Run
  currUserX: number
  currUserY: number

  public bubbleChartOptions: ChartOptions = {
    //tooltips: {
    //  callbacks: {
    //    label: function (t, d) {
    //      return '(Visited:' + 'date'; //https://stackoverflow.com/questions/45249779/chart-js-bubble-chart-changing-dataset-labels
    //    }
    //  }
    //},
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
    // {
    //data: [
    //  //{ x: 10, y: 10, r: 25 },
    //  //{ x: 15, y: 5, r: 25 },
    //  //{ x: 26, y: 12, r: 25 },
    //  //{ x: 7, y: 8, r: 10 },
    //],
    //label: 'Missing',
    //backgroundColor: 'red',
    //borderColor: 'blue',
    //hoverBackgroundColor: 'purple',
    //hoverBorderColor: 'red',
    //},
    {
      data: [
        { x: 10, y: 10, r: 20 },
        { x: 15, y: 5, r: 20 },
        { x: 26, y: 12, r: 20 },
        { x: 7, y: 8, r: 20 },
      ],
      label: 'Missing',
      backgroundColor: 'red',
      borderColor: 'blue',
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'red',
    },
    {
      data: [
        { x: 12, y: 12, r: 20 },
        { x: 17, y: 7, r: 20 },
        { x: 28, y: 14, r: 20 },
        { x: 9, y: 10, r: 20 },
      ],
      label: 'Visited',
      backgroundColor: 'green',
      borderColor: 'blue',
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'red',
    }
  ];

  //public bubbleChartColors: Color[] = [
  //  {
  //    backgroundColor: [
  //      //'red',
  //      'green',
  //      //'blue',
  //      //'purple',
  //      //'yellow',
  //      //'brown',
  //      //'magenta',
  //      //'cyan',
  //      //'orange',
  //      //'pink'
  //    ]
  //  }
  //];

  constructor(
    private runDataService: RunDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.runId = this.activatedRoute.snapshot.params['id']
    this.runDataService.retrieveRun(this.runId).subscribe(
      response => {
        this.run = response
        this.run.startTime = new Date()
        this.runDataService.updateRun(this.runId, this.run).subscribe(
          response => { }
        )
      }
    )


    // fetch run
    // sert start time
    // update

    // set start time to enitity and start timer
    //  tjekke if start time is null. if not does not allow to start.
    this.refreshBubbles() 

  }

  refreshBubbles() {
    this.runDataService.getMissingWaypoints(this.runId).subscribe(
      data => {
        this.waypoints = data
        console.log(data)
        let waypointstobubblearr = this.waypoints.map(item => new WayPointBubbleData(item));
        this.bubbleChartData[0].data = waypointstobubblearr;
      }
    )
    this.runDataService.getLatestCheckpoints(this.runId).subscribe(
      data => {
        this.checkpoints = data
        console.log(data)
        let checkpointbubblearr = this.checkpoints.map(item => new CheckPointBubbleData(item));
        this.bubbleChartData[1].data = checkpointbubblearr;
      }
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
    this.runDataService.addCheckPointIfValid(this.runId, this.currUserX, this.currUserY, 1).subscribe(
      response => this.refreshBubbles() 
    )
  }

  endRun(){
    this.router.navigate(['runresults'])
  }

  //private rand(max: number) {
  //  return Math.trunc(Math.random() * max);
  //}

  //private randomPoint(maxCoordinate: number) {
  //  const x = this.rand(maxCoordinate);
  //  const y = this.rand(maxCoordinate);
  //  const r = this.rand(30) + 5;
  //  return { x, y, r };
  //}

  //public randomize(): void {
  //  const numberOfPoints = this.rand(5) + 5;
  //  const data = Array.apply(null, { length: numberOfPoints }).map(r => this.randomPoint(30));
  //  this.bubbleChartData[0].data = data;
  //}
}
