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
    private wayPoints: WayPoint[], 
    private maxParticipants: number,
    private minParticipants: number,
    private numberOfParticipants: number
  ) { }
}

export class WayPoint {
  constructor(
    private x: number,
    private y: number,
    private index: number) { }
}
