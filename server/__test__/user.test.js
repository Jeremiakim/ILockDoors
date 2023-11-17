const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcryptjs");

let access_token;
beforeAll((done) => {
  const data = require("../data/users.json");
  // console.log(data);

  let user = data.map((el) => {
    delete el.id;
    el.password = hashPassword(el.password);
    el.createdAt = el.updatedAt = new Date();
    return el;
  });
  sequelize.queryInterface
    .bulkInsert("Users", user, {})
    .then(() => {
      const payload = {
        id: 1,
        email: "jer@gmail.com",
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
      done();
    })
    .catch((err) => {
      done(err);
    });
});
//------------------------------------------------------------- login ---------------------------------------------//
describe("/login", () => {
  describe("POST /login - SUCCESS", () => {
    it("Success login dan send the access_token", async () => {
      const user1 = {
        email: "jer67@gmail.com",
        password: "12345",
      };
      const response = await request(app).post("/login").send(user1);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
      // console.log(response.body);
    });
  });
  describe("POST /login - ERROR", () => {
    it("Did not input Email", async () => {
      const user1 = {
        email: "",
        password: "12345",
      };
      const response = await request(app).post("/login").send(user1);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("POST /login - ERROR", () => {
    it("Did not input Password", async () => {
      const user1 = {
        email: "jer67@gmail.com",
        password: "",
      };
      const response = await request(app).post("/login").send(user1);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("POST /login - ERROR", () => {
    it("Invalid email", async () => {
      const user1 = {
        email: "JerKim76@mail.com",
        password: "12345",
      };
      const response = await request(app).post("/login").send(user1);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("POST /login - ERROR", () => {
    it("Invalid Password", async () => {
      const user1 = {
        email: "JerKim76@email.com",
        password: "1234",
      };
      const response = await request(app).post("/login").send(user1);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});

//--------------------------------------------------------- register --------------------------------------------------------------------//
describe("/register", () => {
  describe("POST /register - SUCCESS", () => {
    it("Success Register", async () => {
      const user1 = {
        fullName: "user",
        email: "user@mail.com",
        password: "12345",
        role: "staff",
        address: "BSD",
        phoneNumber: "0812555444",
      };
      const response = await request(app).post("/register").send(user1);

      // console.log(response.body);
      expect(response.status).toEqual(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("POST /register - ERROR", () => {
    it("Did not input email", async () => {
      const user1 = {
        fullName: "user",
        email: null,
        password: "12345",
        role: "staff",
        phoneNumber: "0812555444",
        address: "BSD",
      };
      const response = await request(app).post("/register").send(user1);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("POST /register - ERROR", () => {
    it("Did not input password", async () => {
      const user1 = {
        fullName: "user",
        email: "user@email.com",
        password: null,
        role: "staff",
        phoneNumber: "0812555444",
        address: "BSD",
      };
      const response = await request(app).post("/register").send(user1);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("POST /register - ERROR", () => {
    it("Did not empty email", async () => {
      const user1 = {
        fullName: "user",
        email: "",
        password: "12345",
        role: "staff",
        phoneNumber: "0812555444",
        address: "BSD",
      };
      const response = await request(app).post("/register").send(user1);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("POST /register - ERROR", () => {
    it("Did not empty password", async () => {
      const user1 = {
        fullName: "user",
        email: "user@email.com",
        password: "",
        role: "staff",
        phoneNumber: "0812555444",
        address: "BSD",
      };
      const response = await request(app).post("/register").send(user1);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("POST /register - ERROR", () => {
    it("Email is already exist", async () => {
      const user1 = {
        fullName: "Jerr",
        email: "jer67@gmail.com",
        password: "12345",
        role: "staff",
        phoneNumber: "0812555444",
        address: "BSD",
      };
      const response = await request(app).post("/register").send(user1);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("POST /register - ERROR", () => {
    it("Wrong Format Email", async () => {
      const user1 = {
        fullName: "Jerr",
        email: "JerKim76email.com",
        password: "12345",
        role: "staff",
        phoneNumber: "0812555444",
        address: "BSD",
      };
      const response = await request(app).post("/register").send(user1);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
