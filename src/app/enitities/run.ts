import { WayPoint } from './route';

export class Checkpoint {
  constructor(
    public wayPoint: WayPoint,
    public visitedTimestamp: number) { }
}
