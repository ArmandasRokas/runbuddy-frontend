export class User {
    constructor(
        private id: String,
        private userName: String,
        private email: String,
        private password: String,      
        public locations: Location[]      
    ) { }
}

export class Location{
    constructor(
        private id:String,
        private streetName:String,
        private streetNumber:String,
        private city:String,
        private country:String
    ){ }
}