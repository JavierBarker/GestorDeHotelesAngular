export class Reservation{
    constructor(
        public _id: String,
        public clientId: String,
        public hotelId: String,
        public room: {
            roomId: String,
            name: String,
            description: String,
            services: String,
            cost: Number,
            entryDate: Date,
            exitDate: Date
        },
        public total: Number,
        public cancel: Boolean
    ){}
}