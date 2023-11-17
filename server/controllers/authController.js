const { signToken, verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class AuthController {
  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;
      const client = new OAuth2Client();
      // console.log(token, 10);
      // console.log(client, 11);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      // console.log(tiket);
      const payload = ticket.getPayload();
      // console.log(payload);
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          fullName: payload.given_name,
          email: payload.email,
          password: "password_google",
          role: "Customers",
          address: "-",
          phoneNumber: "0",
        },
        hooks: false,
      });
      // console.log(user.default);
      const access_token = signToken({ id: user.id });
      res.status(200).json(access_token);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = AuthController;
