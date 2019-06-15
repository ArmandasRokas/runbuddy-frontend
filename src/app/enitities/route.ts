import { Location } from '../user/shared/user';

export class Route {
  constructor(
    public id: String,
    public title: String,
    public location: Location,
    public date: Date,
    public distance: number,
    public duration: number,
    public description: String,
    public status: String, 
    public wayPoints: WayPoint[], 
    public maxParticipants: number,
    public minParticipants: number,
    public numberOfParticipants: number,
    public signedUp: boolean
  ) { }
}

export class WayPoint {
  constructor(
    public x: number,
    public y: number,
    public index: number) { }
}
