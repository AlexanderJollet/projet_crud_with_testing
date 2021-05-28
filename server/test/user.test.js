const User = require('../model/model');
const app = require('../../server');
const request = require('chai');
const expect = require('chai').expect;
const control = require ('../controller/controller');
const UserAdd = { name: "alex", lastname: "jollet", email: "email@gmail.com", phone_number: 0645636347 };

describe("Unit test CRUD", () => {
    it("Should verify all data"), async function() {
        expect(UserAdd.name).to.equal("alex");
        expect(UserAdd.name).to.not.be.empty;
        expect(UserAdd.phone_number).to.have.lengthOf(10);
        expect(UserAdd.phone_number).to.not.be.empty;
        expect(UserAdd.lastname).to.equal("jollet");
        expect(UserAdd.lastname).to.not.be.empty;
        expect(UserAdd.email).to.have.string('@gmail.com');
        expect(UserAdd.email).to.not.be.empty;
    }
})


describe("Test API (integration)", () =>{
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