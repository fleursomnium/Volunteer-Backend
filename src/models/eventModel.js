import { v4 as uuidv4 } from 'uuid';


class Event {
    constructor({
        eventName,
        eventDescription,
        address1,
        address2,
        city,
        state,
        zipcode,
        urgency,
        skills = [],
        dates = [],
        time
    }) {
        this.id = uuidv4();
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.urgency = urgency;
        this.skills = skills;
        this.dates = dates;
        this.time = time;
        this.createdAt = new Date();
    }
}


export default Event;  // Use ES module export




// const { v4: uuidv4 } = require("uuid");

// class Event {
//   constructor({ name, date, location, description }) {
//     this.id = uuidv4();
//     this.name = name;
//     this.date = date;
//     this.location = location;
//     this.description = description;
//     this.createdAt = new Date();
//   }
// }

// module.exports = Event;
