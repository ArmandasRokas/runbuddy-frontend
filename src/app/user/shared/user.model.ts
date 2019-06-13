export interface IUser{
    id: string
    userName: string
    email: string
    password: string
    location?:{
        id:string
        streetName:string
        streetNumber:string
        city:string
        country:string
    }
    routes?:IRoute
    locations?:ILocation[]
}
export interface ILocation{
    title: string;
    id:string
    streetName:string
    streetNumber:string
    city:string
    country:string
}
export interface IRoute{
    id:string
    title:string
    location?:ILocation
    date:Date
    distance:number
    duration:number
    description:string
    status:string
    wayPoints?:IWayPoint
    maxParticipants:number
    minParticipants:number
    numberOfParticipants:number
}
export interface IWayPoint{
    x:number
    y:number
    index:number
}