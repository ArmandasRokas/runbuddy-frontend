import { Location } from '../user/shared/user';

export class Route {
  constructor(
    private id: String,
    private title: String,
    private location: Location,
    private date: Date,
    private distance: number,
    private duration: number,
    private description: String,
    private status: String, 
    private _wayPoints: WayPoint[], 
    private maxParticipants: number,
    private minParticipants: number,
    private numberOfParticipants: number
  ) { }

  public get wayPoints(): WayPoint[] {
    return this._wayPoints
  }
  public set wayPoints(value: WayPoint[]) {
    this._wayPoints = value
  }
}

export class WayPoint {
  constructor(
    public x: number,
    public y: number,
    public index: number) { }
}
