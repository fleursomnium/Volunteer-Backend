// notificationRoutes.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../server");
const Notification = require("../models/notificationModel");

jest.mock("../models/notificationModel");

const mockNotification = {
    title: "Test Notification",
    message: "This is a test notification",
};

describe("Notification Routes", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("POST /api/notifications should create a notification and return status 201", async () => {
        Notification.create.mockResolvedValue({ _id: "notif123", title: mockNotification.title, message: mockNotification.message });

        const response = await request(app).post("/api/notifications").send(mockNotification);

        console.log("POST response:", response.status, response.body);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            msg: "Notification created successfully",
            notification: { _id: "notif123", title: mockNotification.title, message: mockNotification.message },
        });
    });

    test("POST /api/notifications should return status 400 if required fields are missing", async () => {
        Notification.create.mockImplementation(() => {
            throw new Error("Validation Error");
        });

        const response = await request(app).post("/api/notifications").send({});
        console.log("Response for missing fields:", response.status, response.body);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ msg: "Please fill all required fields" });
    });

    test("GET /api/notifications should return all notifications and status 200", async () => {
        const mockNotifications = [{ _id: "notif123", title: mockNotification.title, message: mockNotification.message }];
        Notification.find.mockResolvedValue(mockNotifications);

        const response = await request(app).get("/api/notifications");
        console.log("GET response:", response.status, response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockNotifications);
    });
});
