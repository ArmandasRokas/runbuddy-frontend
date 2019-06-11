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
    locations?:ILocation[]
}

export interface ILocation{
    id:string
    streetName:string
    streetNumber:string
    city:string
    country:string
}