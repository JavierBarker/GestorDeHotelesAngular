export class Hotel{
    constructor(
        public _id: String,
        public requests: Number,
        public name: String,
        public address: String,
        public administratorId: String,
        public image: String,
        public rooms: [{
            _id: String,
            nameRoom: String,
            descriptionRoom: String,
            services: String,
            cost: Number,
            imageRoom: String
        }],
        public events:[{
            _id:String,
            nameEvent: String,
            descriptionEvent: String,
            typeEvent: String
        }]
    ){}
}