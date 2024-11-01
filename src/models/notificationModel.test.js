const mongoose = require('mongoose');
const Notification = require('../models/notificationModel');

describe('Notification Model', () => {
    beforeAll(async () => {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
            // Removed deprecated options
        });
    });

    afterAll(async () => {
        // Disconnect from MongoDB
        await mongoose.connection.close();
    });

    it('should create and save a notification successfully', async () => {
        const mockNotification = new Notification({
            title: 'Test Notification',
            message: 'This is a test message.',
            targetAudience: 'volunteer',
            eventId: new mongoose.Types.ObjectId(), // Use 'new' to create ObjectId
        });

        const savedNotification = await mockNotification.save();
        expect(savedNotification._id).toBeDefined();
        expect(savedNotification.title).toBe(mockNotification.title);
        expect(savedNotification.message).toBe(mockNotification.message);
        expect(savedNotification.targetAudience).toBe(mockNotification.targetAudience);
    });

    it('should throw validation error when required fields are missing', async () => {
        const invalidNotification = new Notification({}); // No fields

        let error;
        try {
            await invalidNotification.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.name).toBe('ValidationError');
    });

    it('should handle error when saving notification fails', async () => {
        // Simulating save failure
        jest.spyOn(Notification.prototype, 'save').mockImplementationOnce(() => {
            throw new Error('Save failed');
        });

        const mockNotification = new Notification({
            title: 'Error Notification',
            message: 'This will fail.',
            targetAudience: 'volunteer',
            eventId: new mongoose.Types.ObjectId(), // Use 'new' to create ObjectId
        });

        let error;
        try {
            await mockNotification.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.message).toBe('Save failed');
    });
});




// const mongoose = require('mongoose');
// const Notification = require('../models/notificationModel');

// describe('Notification Model', () => {
//     beforeAll(async () => {
//         // Connect to MongoDB
//         await mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//     });

//     afterAll(async () => {
//         // Disconnect from MongoDB
//         await mongoose.connection.close();
//     });

//     it('should create and save a notification successfully', async () => {
//         const mockNotification = new Notification({
//             title: 'Test Notification',
//             message: 'This is a test message.',
//             targetAudience: 'volunteer',
//             eventId: mongoose.Types.ObjectId(),
//         });

//         const savedNotification = await mockNotification.save();
//         expect(savedNotification._id).toBeDefined();
//         expect(savedNotification.title).toBe(mockNotification.title);
//         expect(savedNotification.message).toBe(mockNotification.message);
//         expect(savedNotification.targetAudience).toBe(mockNotification.targetAudience);
//     });

//     it('should throw validation error when required fields are missing', async () => {
//         const invalidNotification = new Notification({}); // No fields

//         let error;
//         try {
//             await invalidNotification.save();
//         } catch (err) {
//             error = err;
//         }

//         expect(error).toBeDefined();
//         expect(error.name).toBe('ValidationError');
//     });

//     it('should handle error when saving notification fails', async () => {
//         // Simulating save failure
//         jest.spyOn(Notification.prototype, 'save').mockImplementationOnce(() => {
//             throw new Error('Save failed');
//         });

//         const mockNotification = new Notification({
//             title: 'Error Notification',
//             message: 'This will fail.',
//             targetAudience: 'volunteer',
//             eventId: mongoose.Types.ObjectId(),
//         });

//         let error;
//         try {
//             await mockNotification.save();
//         } catch (err) {
//             error = err;
//         }

//         expect(error).toBeDefined();
//         expect(error.message).toBe('Save failed');
//     });
// });



// // const Notification = require('../models/notificationModel');
// jest.mock('../models/notificationModel');

// describe('Notification Model', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     describe('Create and Save Notification', () => {
//         it('should create and save a notification successfully', async () => {
//             const mockNotification = {
//                 _id: 'notification123',
//                 title: 'New Event Created',
//                 message: 'A new event is available for volunteers!',
//                 targetAudience: 'volunteer',
//                 eventId: 'event123',
//                 save: jest.fn()
//             };

//             Notification.mockImplementation(() => mockNotification);
//             await new Notification(mockNotification).save();

//             expect(Notification).toHaveBeenCalledWith(expect.objectContaining({
//                 title: 'New Event Created',
//                 message: 'A new event is available for volunteers!',
//                 targetAudience: 'volunteer',
//                 eventId: 'event123'
//             }));
//             expect(mockNotification.save).toHaveBeenCalled();
//         });

//         it('should handle error when saving notification fails', async () => {
//             const mockNotification = {
//                 title: 'New Event',
//                 message: 'A new event is created!',
//                 targetAudience: 'volunteer'
//             };

//             Notification.prototype.save = jest.fn().mockRejectedValue(new Error('Save failed'));
//             const notification = new Notification(mockNotification);

//             await expect(notification.save()).rejects.toThrow('Save failed');
//         });
//     });

//     describe('Fetching Notifications', () => {
//         it('should fetch notifications by target audience', async () => {
//             const mockNotifications = [
//                 { _id: 'notification1', title: 'Event Update', targetAudience: 'volunteer' },
//                 { _id: 'notification2', title: 'Event Reminder', targetAudience: 'volunteer' }
//             ];

//             Notification.find.mockResolvedValue(mockNotifications);
//             const result = await Notification.find({ targetAudience: 'volunteer' });

//             expect(Notification.find).toHaveBeenCalledWith({ targetAudience: 'volunteer' });
//             expect(result).toEqual(mockNotifications);
//         });

//         it('should fetch notifications by eventId', async () => {
//             const mockNotifications = [
//                 { _id: 'notification1', title: 'Event Update', eventId: 'event123' }
//             ];

//             Notification.find.mockResolvedValue(mockNotifications);
//             const result = await Notification.find({ eventId: 'event123' });

//             expect(Notification.find).toHaveBeenCalledWith({ eventId: 'event123' });
//             expect(result).toEqual(mockNotifications);
//         });
//     });
// });

//11/1
// const Notification = require('../models/notificationModel');
// const mongoose = require('mongoose');

// describe('Notification Model', () => {
//     describe('Create and Save Notification', () => {
//         it('should handle error when saving notification fails', async () => {
//             jest.spyOn(Notification.prototype, 'save').mockImplementation(() => {
//                 throw new Error('Save failed');
//             });

//             const mockNotification = {
//                 userId: new mongoose.Types.ObjectId(),
//                 message: 'Test notification',
//                 type: 'info'
//             };
//             const notification = new Notification(mockNotification);

//             await expect(notification.save()).rejects.toThrow('Save failed');
//         });
//     });
// });
