const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");
const authentication = async (req, res, next) => {
  try {
    // console.log(req.headers);
    let { authorization } = req.headers;
    // console.log(authorization);
    if (!authorization) {
      throw {
        name: "Unauthorized",
        message: "Please Login First",
      };
    }
    authorization = authorization.split(" ")[1];
    // console.log(authorization);
    const verifiedToken = verifyToken(authorization);
    const compareUser = await User.findOne({
      where: {
        email: verifiedToken.email,
      },
    });
    if (!compareUser) {
      throw {
        name: `Unauthorized`,
        message: `You Should Login First`,
      };
    }
    // console.log(verifiedToken, "<<<<<<di authen");
    req.infoUser = {
      id: verifiedToken.id,
      email: verifiedToken.email,
      role: verifiedToken.role,
    };
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authentication;
