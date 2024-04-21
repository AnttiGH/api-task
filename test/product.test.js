const request = require("supertest")
const app = require("../dist/main");

describe("GET /myapi/checkprime", () => {
    it("A prime number as input should return that isPrime is true", async () => {
        return request(app)
            .get("/myapi/checkprime?number=11")
            .expect('Content-Type', /json/)
            .expect(200)
            .expect( {"isPrime": true} )
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
});

describe("GET /myapi/checkprime", () => {
    it("A non-prime number as input should return that isPrime is false", async () => {
        return request(app)
            .get("/myapi/checkprime?number=4")
            .expect('Content-Type', /json/)
            .expect(200)
            .expect( {"isPrime": false} )
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
});

describe("GET /myapi/checkprime", () => {
    it("An unexpected input should return status code 400", async () => {
        return request(app)
            .get("/myapi/checkprime?number=4a")
            .expect(400)
            .then((res) => {
                expect(res.statusCode).toBe(400);
            })  
    });
});

describe("GET /myapi/sum", () => {
    it("An unexpected input should return status code 400", async () => {
        return request(app)
            .get("/myapi/sum?numbers=4,4,a")
            .expect(400)
            .then((res) => {
                expect(res.statusCode).toBe(400);
            })  
    });
});

describe("GET /myapi/sum", () => {
    it("The sum of numbers should be calculated correctly and return that isPrime is false when the sum is not a prime number", async () => {
        return request(app)
            .get("/myapi/sum?numbers=1,2,3")
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({ "result": 6, "isPrime":false })
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
});

describe("GET /myapi/sum", () => {
    it("The sum of numbers should be calculated correctly and return that isPrime is true when the sum is a prime number", async () => {
        return request(app)
            .get("/myapi/sum?numbers=1,2,3,1")
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({ "result": 7, "isPrime": true })
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
});