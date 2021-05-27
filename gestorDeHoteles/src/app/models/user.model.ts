export class User{
    constructor(
        public _id: String,
        public user: String,
        public name: String,
        public password: String,
        public role: String,
        public invoice: [{
            customerId: String,
            hotelId: String,
            room: {
                roomId: String,
                name: String,
                description: String,
                services: String,
                cost: Number,
                entryDate: Date,
                exitDate: Date,   
            },
            total: Number,
            daysElapsed: Number
        }]
    ){}
}