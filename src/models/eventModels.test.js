

//best score
const Event = require('../models/eventModel');

describe('Event Model', () => {
    it('should create a new Event instance with valid properties', () => {
        const eventData = {
            eventName: 'Community Cleaning',
            description: 'Clean the parks and streets.',
            location: {
                address: '12345',
                city: 'Spring',
                state: 'TX',
                zipcode: '77777',
            },
            urgency: 'low',
            requiredSkills: ['cleaning', 'organizing'],
            date: [new Date('2024-10-17')],
            time: '14:00',
        };

        const event = new Event(eventData);

        expect(event.eventName).toBe(eventData.eventName);
        expect(event.description).toBe(eventData.description);
        expect(event.location.city).toBe(eventData.location.city);
        expect(event.urgency).toBe(eventData.urgency);
        expect(event.requiredSkills).toEqual(eventData.requiredSkills);
        expect(event.date).toEqual(eventData.date);
        expect(event.time).toBe(eventData.time);
    });
});



// const Event = require("./eventModel");

// describe("Event Model", () => {
//     test("should create an event instance with correct properties", () => {
//         const data = {
//             name: "Test Event",
//             date: "2024-11-15",
//             location: "San Francisco",
//             description: "Test Description",
//         };
//         const event = new Event(data);

//         expect(event).toHaveProperty("id");
//         expect(event.name).toBe(data.name);
//         expect(event.date).toBe(data.date);
//         expect(event.location).toBe(data.location);
//         expect(event.description).toBe(data.description);
//         expect(event).toHaveProperty("createdAt");
//     });
// });
