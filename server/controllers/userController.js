const { User } = require("../models");
const { hashPassword, compareHash } = require("../helpers/bcryptjs");
const { signToken, verifyToken } = require("../helpers/jwt");
class UserController {
  static async Register(req, res, next) {
    // console.log(req.body);
    try {
      const { fullName, email, password, address, role, phoneNumber } =
        req.body;
      if (!fullName) {
        throw {
          name: `Name Is Required`,
          message: `Name Must Be Required`,
        };
      }
      if (!email) {
        throw {
          name: `Email Is Required`,
          message: `Email Must Be Required`,
        };
      }
      if (!password) {
        throw {
          name: `Password Is Required`,
          message: `Password Must Be Required`,
        };
      }
      if (!address) {
        throw {
          name: `Address Is Required`,
          message: `Address Must Be Required`,
        };
      }
      if (!phoneNumber) {
        throw {
          name: `Phone Number Is Required`,
          message: `Phone Number Must Be Required`,
        };
      }
      const user = await User.create({
        fullName,
        email,
        password,
        role: "Costumers",
        address,
        phoneNumber,
      });

      res.status(201).json({
        msg: `User Id ${user.id} was created`,
        New_User: { id: user.id, Name: user.username, email: user.email },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async Login(req, res, next) {
    try {
      //   console.log(req.body, 60);
      const { email, password } = req.body;
      if (!email) {
        throw {
          name: `Email Is Required`,
          message: `Email Must Be Required`,
        };
      }
      if (!password) {
        throw {
          name: `Password Is Required`,
          message: `Password Must Be Required`,
        };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });
      //   console.log(user);
      if (!user) {
        throw {
          name: `Invalid Email`,
          message: `Invalid Email Or Password`,
        };
      }
      const validPassword = hashPassword(password, user.password);
      if (!validPassword) {
        throw {
          name: `Invalid Password`,
          message: `Invalid Email Or Password`,
        };
      }
      let payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      let access_token = signToken(payload);
      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
