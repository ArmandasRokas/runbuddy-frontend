export class Route {
  constructor(
    private id: String,
    private title: String,
    //private location,
    private date: Date,
    //private distance: number,
    //private duration: number,
    //private description: String,
    //private status: String, 
      public wayPoints: WayPoint[] 
    //private maxParticipants: number,
    //private minParticipants: number,
    //private numberOfParticipants: number
  ) { }
}

export class WayPoint {
  constructor(
    private x: number,
    private y: number,
    private index: number) { }
}
