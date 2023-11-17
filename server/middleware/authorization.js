const { Room } = require("../models/index");

const authorization = async (req, res, next) => {
  try {
    // console.log(req.user);
    const { userId, role } = req.infoUser;

    if (role !== "Admin") {
      const room = await Room.findByPk(req.params.roomId);
      if (!room) {
        throw {
          name: `Not Found`,
          message: "Room not found",
        };
      }
      if (userId !== room.UserId) {
        throw {
          name: `Forbidden`,
          message: "You don't have the right access",
        };
      }
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authorization,
};
