import { WayPoint } from './route';
import { Route } from './route';

export class Checkpoint {
  constructor(
    public wayPoint: WayPoint,
    public visitedTimestamp: number) { }
}

export class Run {
  private id: String;
    private route: Route;
    private checkpoints: Checkpoint[];
    private startTime: Date;
    private endTime: Date;
}
