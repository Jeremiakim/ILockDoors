const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcryptjs");

let access_token;
beforeAll((done) => {
  const users = require("../data/users.json");
  let user = users.map((el) => {
    delete el.id;
    el.password = hashPassword(el.password);
    el.createdAt = el.updatedAt = new Date();
    return el;
  });

  const accomodations = require("../data/rooms.json");
  const rooms = accomodations.map((el) => {
    delete el.id;
    el.createdAt = el.updatedAt = new Date();

    return el;
  });
  const accomodation = require("../data/accomodations.json");
  const accomodations = accomodation.map((el) => {
    delete el.id;
    el.createdAt = el.updatedAt = new Date();

    return el;
  });

  sequelize.queryInterface
    .bulkInsert("Users", user, {})
    .then(() => {
      return sequelize.queryInterface.bulkInsert(
        "Accomodations",
        accomodations,
        {}
      );
    })
    .then(() => {
      return sequelize.queryInterface.bulkInsert("Rooms", rooms, {});
    })
    .then(() => {
      const payload = {
        id: 1,
        email: "jer67@gmail.com",
        role: "Admin",
      };
      access_token = signToken(payload);
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  sequelize.queryInterface
    .bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    })
    .then(() => {
      return sequelize.queryInterface.bulkDelete("Rooms", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then(() => {
      return sequelize.queryInterface.bulkDelete("Accomodations", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});
//---------------------------------------------------------- POST ROOMS -----------------------------------------------------//
describe("/accomodations", () => {
  describe("POST /accomodations - SUCCESS", () => {
    it.only("Success Add Support Table", async () => {
      let body = {
        name: "Villa Bogor",
        city: "Hello",
      };
      const response = await request(app)
        .post("/accomodations")
        .send(body)
        .set("authorization", `Bearer ${access_token}`);
      console.log(response);

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
      // console.log(response.body);
    });
  });

  describe("POST /accomodations - ERROR", () => {
    it("Failed Because Didn't Login", async () => {
      let body = {
        name: "Villa Bogor",
        roomNumber: 1,
        imgUrl: "Ini Gambar",
        price: 299000,
        description: "Sama Saja loh",
        startDate: `11-11-2020`,
        endDate: `11-11-2020`,
        status: "vacant",
        externalId: "A-981293",
        UserId: 1,
        AccomodationId: 1,
      };
      const response = await request(app).post("/rooms").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("POST /rooms - ERROR", () => {
    it("Failed Because Wrong Access_token", async () => {
      let body = {
        name: "Villa Bogor",
        roomNumber: 1,
        imgUrl: "Ini Gambar",
        price: 299000,
        description: "Sama Saja loh",
        startDate: `11-11-2020`,
        endDate: `11-11-2020`,
        status: "vacant",
        externalId: "A-981293",
        UserId: 1,
        AccomodationId: 1,
      };
      const response = await request(app)
        .post("/rooms")
        .send(body)
        .set(
          "authorization",
          `Bearer ono213893n19n0*#&)$#)$N)#!$N)n09xnoiroiqnr`
        );

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("POST /rooms - ERROR", () => {
    it("Failed Because Empty Input", async () => {
      let body = {
        name: "",
        roomNumber: 1,
        imgUrl: "Ini Gambar",
        price: 299000,
        description: "Sama Saja loh",
        startDate: `11-11-2020`,
        endDate: `11-11-2020`,
        status: "vacant",
        externalId: "A-981293",
        UserId: 1,
        AccomodationId: 1,
      };
      const response = await request(app)
        .post("/rooms")
        .send(body)
        .set("authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
