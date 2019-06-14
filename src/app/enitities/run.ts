import { WayPoint } from './route';
import { Route } from './route';

export class Checkpoint {
  constructor(
    private wayPoint: WayPoint,
    private visitedTimestamp: number) { }
}

export class Run {
  constructor(
    private id: String,
    private route: Route,
    private checkpoints: Checkpoint[],
    private startTime: Date,
    private endTime: Date
  ) { }

}
