import { WayPoint } from './route';
import { Route } from './route';

export class Checkpoint {
  constructor(
    public wayPoint: WayPoint,
    public visitedTimestamp: number) { }
}

export class Run {
  constructor(
    public id: String,
    public route: Route,
    public checkpoints: Checkpoint[],
    public startTime: Date,
    public endTime: Date
  ) { }

}
