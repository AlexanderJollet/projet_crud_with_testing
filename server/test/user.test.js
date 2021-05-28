const User = require('../model/model');
const app = require('../../server');
const request = require('chai');
const expect = require('chai').expect;

describe("Test API", () =>{
    beforeEach(async () =>{
        await User.deleteMany({});
    });

    describe("POST /add_user", function(){
        it("Should create and return a user", async function() {
            let data = {
                name: "Alex",
                lastname: "jollet",
                email: "hi@gmail.com",
                phone_number: 0645454546,
            }

            let res = await request(app).create("/api/users").send(data);

            expect(res.status).to.equal(201);
            expect(res.body.user).to.have.property("Alex", data.name);
            expect(res.body.user).to.have.property("jollet", data.lastname);
            expect(res.body.user).to.have.property("hi@gmail.com", data.email);
            expect(res.body.user).to.have.property(0645454546, data.phone_number);
        })
        it("Should return error if wrong phone number / email provided", async function() {
            let data = {
                name: "alex",
                lastname: "jo",
                email: "hi@gmail.com",
                phone_number: 0645454546,
            };

            await request(app).post("/api/users").send(data);

            data = {
                email: "hi@com",//wrong email
                phone_number: 0645454546,
            }
            //Send wrong data and expect error 401
            let res = await request(app).post("/api/users").send(data);

            expect(res.status).to.equal(401);
        })
    })
})