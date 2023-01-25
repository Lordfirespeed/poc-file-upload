const request = require("supertest");
const create_app = require("./app.js");

const app = create_app();


describe("Test API", () => {
    describe("Test API methods wih no uploads", () => {
        test("Post some form data to /api/info", async () => {
            const response = await request(app)
                .post("/api/info")
                .accept("application/json")
                .field("name", "My name here")
                .field("phone", "My phone number");
            expect(response.ok).toBe(true);
            expect(response.body.message).toBe("coolio");
        });
    });

    describe("Test API methods with one upload", () => {
        test("Post some form data to /api/avatar", async () => {
            const response = await request(app)
                .post("/api/avatar")
                .accept("application/json")
                .field("my_name_is", "jackson")
                .attach("avatar", "./test/vacation_capybara");

            expect(response.ok).toBe(true);
        });
    });

    describe("Test API methods with multiple uploads", () => {

    });
});
