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

  const room = require("../data/rooms.json");
  const rooms = room.map((el) => {
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
describe("/room", () => {
  describe("POST /room - SUCCESS", () => {
    it("Success Add Main Table", async () => {
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
        .set("authorization", `Bearer ${access_token}`);
      console.log(response);

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
      // console.log(response.body);
    });
  });

  describe("POST /room - ERROR", () => {
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
//-------------------------------------------------- GET PRODUCT --------------------------------------------------------//
describe("/rooms", () => {
  describe("GET /rooms - SUCCESS", () => {
    it("Success Read Main Table", async () => {
      const response = await request(app)
        .get("/rooms")
        .set("authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
      // console.log(response.body);
    });
  });
  describe("GET /rooms - ERROR", () => {
    it("Failed Because Didn't Login", async () => {
      const response = await request(app).post("/rooms");

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("GET /rooms - ERROR", () => {
    it("Failed Because Wrong Access_token", async () => {
      const response = await request(app)
        .get("/rooms")
        .set(
          "authorization",
          `Bearer ono213893n19n0*#&)$#)$N)#!$N)n09xnoiroiqnr`
        );

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
// ------------------------------------ Get Detail Product ---------------------------------------//
describe("/rooms", () => {
  describe("GET /rooms/:roomId - SUCCESS", () => {
    it("Success Detail Read Main Table", async () => {
      let roomId = 2;
      const response = await request(app)
        .get(`/rooms/${roomId}`)
        .set("authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
      // console.log(response.body);
    });
  });
  describe("GET /rooms - ERROR", () => {
    it("Failed Because Didn't Login", async () => {
      let roomId = 2;
      const response = await request(app).get(`/rooms/${roomId}`);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("GET /rooms - ERROR", () => {
    it("Failed Because Wrong Access_token", async () => {
      let roomId = 2;
      const response = await request(app)
        .get(`/rooms/${roomId}`)
        .set("authorization", `Bearer moiqm7920109200md10*^&%R&&&`);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("GET /rooms - ERROR", () => {
    it("Failed Because Id Not Found", async () => {
      let roomId = 100;
      const response = await request(app)
        .get(`/rooms/${roomId}`)
        .set("authorization", `Bearer ${access_token}`);
      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
//------------------------------------------------- Update Product -------------------------------------------------------//
describe("/rooms", () => {
  describe("PUT /rooms/:roomId - SUCCESS", () => {
    it("Success Detail Update Main Table", async () => {
      let roomId = 1;
      let body = {
        name: "Villa",
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
        .put(`/rooms/${roomId}`)
        .send(body)
        .set("authorization", `Bearer ${access_token}`);

      console.log(response);
      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("PUT /rooms/roomId - ERROR", () => {
    it("Failed Because Didn't Login", async () => {
      let roomId = 1;
      let body = {
        name: "Villa",
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
      const response = await request(app).put(`/rooms/${roomId}`).send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("PUT /rooms/roomId - ERROR", () => {
    it("Failed Because Wrong Access_token", async () => {
      let roomId = 1;
      let body = {
        name: "Villa",
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
        .put(`/rooms/${roomId}`)
        .send(body)
        .set("authorization", `Bearer moiqm7920109200md10*^&%R&&&`);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("PUT /rooms/roomId - ERROR", () => {
    it("Failed Because the id identity is not define", async () => {
      let roomId = 100;
      let body = {
        name: "Villa",
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
        .put(`/rooms/${roomId}`)
        .send(body)
        .set("authorization", `Bearer ${access_token}`);
      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("PUT /rooms/roomId - ERROR", () => {
    it("Failed Because Staff Cannot process data from another poeple", async () => {
      let roomId = 1;
      let body = {
        name: "Villa",
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
        .put(`/rooms/${roomId}`)
        .send(body)
        .set("authorization", `Bearer ${access_token}`);
      //   console.log(response);
      expect(response.status).toBe(403);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("PUT /rooms/roomId - ERROR", () => {
    it("Failed Because empty Input", async () => {
      let roomId = 1;
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
        .put(`/rooms/${roomId}`)
        .send(body)
        .set("authorization", `Bearer ${access_token}`);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
//---------------------------------------Deleted Product---------------------------------------//
// describe("/rooms", () => {
//   describe("DELETE /rooms/:roomId - SUCCESS", () => {
//     it.only("Success Detail Delete Main Table", async () => {
//       let roomId = 1;
//       //   let body = {
//       //     name: "oi",
//       //     roomNumber: 1,
//       //     imgUrl: "Ini Gambar",
//       //     price: 299000,
//       //     description: "Sama Saja loh",
//       //     startDate: `11-11-2020`,
//       //     endDate: `11-11-2020`,
//       //     status: "vacant",
//       //     externalId: "A-981293",
//       //     UserId: 1,
//       //     AccomodationId: 1,
//       //   };
//       const response = await request(app)
//         .put(`/rooms/${roomId}`)
//         // .send(body)
//         .set("authorization", `Bearer ${access_token}`);

//       console.log(response.text);
//       expect(response.status).toBe(200);
//       expect(response.body).toBeInstanceOf(Object);
//       expect(response.body).toHaveProperty("message", expect.any(String));
//     });
//   });
//   describe("DELETE /rooms/roomId - ERROR", () => {
//     it("Failed Because Didn't Login", async () => {
//       let roomId = 1;
//       const body = {
//         name: "T-shirt Over Size",
//         description: "Sama Saja loh",
//         price: 299000,
//         stock: 40,
//         imgUrl: "Ini Gambar",
//         categoryId: 1,
//         authorId: 1,
//       };
//       const response = await request(app).put(`/rooms/${roomId}`).send(body);

//       expect(response.status).toBe(401);
//       expect(response.body).toBeInstanceOf(Object);
//       expect(response.body).toHaveProperty("message", expect.any(String));
//     });
//   });
//   describe("DELETE /rooms/roomId - ERROR", () => {
//     it("Failed Because Wrong Access_token", async () => {
//       let roomId = 1;
//       const body = {
//         name: "T-shirt Over Size",
//         description: "Sama Saja loh",
//         price: 299000,
//         stock: 40,
//         imgUrl: "Ini Gambar",
//         categoryId: 1,
//         authorId: 1,
//       };
//       const response = await request(app)
//         .put(`/rooms/${roomId}`)
//         .send(body)
//         .set("authorization", `Bearer moiqm7920109200md10*^&%R&&&`);

//       expect(response.status).toBe(401);
//       expect(response.body).toBeInstanceOf(Object);
//       expect(response.body).toHaveProperty("message", expect.any(String));
//     });
//   });
//   describe("DELETE /rooms/roomId - ERROR", () => {
//     it("Failed Because the id identity is not define", async () => {
//       let roomId = 100;
//       const body = {
//         name: "T-shirt Over Size",
//         description: "Sama Saja loh",
//         price: 299000,
//         stock: 40,
//         imgUrl: "Ini Gambar",
//         categoryId: 1,
//         authorId: 1,
//       };
//       const response = await request(app)
//         .put(`/rooms/${roomId}`)
//         .send(body)
//         .set("authorization", `Bearer ${access_token}`);
//       expect(response.status).toBe(404);
//       expect(response.body).toBeInstanceOf(Object);
//       expect(response.body).toHaveProperty("message", expect.any(String));
//     });
//   });
//   describe("DELETE /rooms/roomId - ERROR", () => {
//     it("Failed Because Staff Cannot process data from another poeple", async () => {
//       let roomId = 1;
//       const body = {
//         name: "T-shirt Over Size",
//         description: "Sama Saja loh",
//         price: 299000,
//         stock: 40,
//         imgUrl: "Ini Gambar",
//         categoryId: 1,
//         authorId: 1,
//       };
//       const response = await request(app)
//         .put(`/rooms/${roomId}`)
//         .send(body)
//         .set("authorization", `Bearer ${access_token}`);
//       expect(response.status).toBe(403);
//       expect(response.body).toBeInstanceOf(Object);
//       expect(response.body).toHaveProperty("message", expect.any(String));
//     });
//   });
// });

// //--------------------------------------------- Read Category ----------------------------------------------//
// describe("/accomodation", () => {
//   describe("GET /accomodation - SUCCESS", () => {
//     it("Success Read Main Table", async () => {
//       const response = await request(app)
//         .get("/accomodation")
//         .set("authorization", `Bearer ${access_token}`);

//       expect(response.status).toBe(200);
//       expect(response.body).toBeInstanceOf(Object);
//       expect(response.body).toHaveProperty("message", expect.any(String));
//       // console.log(response.body);
//     });
//   });
//   describe("GET /rooms - ERROR", () => {
//     it("Failed Because Didn't Login", async () => {
//       const response = await request(app).post("/rooms");

//       expect(response.status).toBe(401);
//       expect(response.body).toBeInstanceOf(Object);
//       expect(response.body).toHaveProperty("message", expect.any(String));
//     });
//   });
//   describe("GET /rooms - ERROR", () => {
//     it("Failed Because Wrong Access_token", async () => {
//       const response = await request(app)
//         .get("/rooms")
//         .set(
//           "authorization",
//           `Bearer ono213893n19n0*#&)$#)$N)#!$N)n09xnoiroiqnr`
//         );

//       expect(response.status).toBe(401);
//       expect(response.body).toBeInstanceOf(Object);
//       expect(response.body).toHaveProperty("message", expect.any(String));
//     });
//   });
// });
